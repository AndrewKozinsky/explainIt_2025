import { Injectable } from '@nestjs/common'
import { buildPage, toPrismaPagination } from 'utils/pagination'
import { PrismaService } from 'db/prisma.service'
import { getAiDialogueLastMessage } from 'features/aiDialogue/getAiDialogueLastMessage'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { AiDialoguesPageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'
import { AiDialogueImageOutModel } from 'models/aiDialogue/aiDialogueVisuals.out.model'
import { Prisma } from 'prisma/generated/client'
import type { PaginationParams } from 'types/pagination'

const imageSelect = {
	id: true,
	s3_key: true,
	mime_type: true,
	width: true,
	height: true,
	layout_version: true,
} as const satisfies Prisma.AiDialogueImageSelect

const characterSelect = {
	id: true,
	npc_id: true,
	name: true,
	role: true,
	AiDialogueImage: { where: { type: 'emotionSheet' }, take: 1, select: imageSelect },
	ImageGenerationJob: { where: { type: 'emotionSheet' }, take: 1, select: { status: true } },
} as const satisfies Prisma.AiDialogueCharacterSelect

const dialogueSelect = {
	id: true,
	source_language_code: true,
	max_cefr_level: true,
	created_at: true,
	scenario: { select: { id: true, title: true } },
	AiDialogueCharacter: { orderBy: { id: 'asc' }, select: characterSelect },
} as const satisfies Prisma.AiDialogueSelect

const messageSelect = {
	id: true,
	dialogue_id: true,
	type: true,
	payload: true,
	created_at: true,
	AiDialogueImage: { where: { type: 'scene' }, take: 1, select: imageSelect },
} as const satisfies Prisma.AiDialogueMessageSelect

type ImageDb = Prisma.AiDialogueImageGetPayload<{ select: typeof imageSelect }>

type CharacterDb = Prisma.AiDialogueCharacterGetPayload<{ select: typeof characterSelect }>

type LegacyCharacterDb = {
	dialogueId: number
	firstMessageId: number
	npcId: string
	name: string | null
	role: string | null
}

@Injectable()
export class AiDialogueListQueryRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly storage: CloudflareS3Service,
	) {}

	/** Только owner-scoped страница, последнее npcActions, последняя сцена и полный реестр NPC. */
	@CatchDbError()
	async getUserDialogues(userId: number, pagination: PaginationParams): Promise<AiDialoguesPageOutModel> {
		const { total, dialogues, messages, legacyCharacters } = await this.readPage(userId, pagination)
		const sceneByDialogueId = new Map(
			messages
				.filter((message) => message.type === 'sceneUpdate')
				.map((message) => [message.dialogue_id, message]),
		)
		const lastMessageByDialogueId = new Map(
			messages
				.filter((message) => message.type === 'npcActions')
				.map((message) => [message.dialogue_id, message]),
		)
		const signedImages = new Map<string, Promise<AiDialogueImageOutModel>>()
		const mapImage = (image?: ImageDb) => {
			if (!image) return Promise.resolve(null)
			if (!signedImages.has(image.s3_key)) signedImages.set(image.s3_key, this.mapImage(image))
			return signedImages.get(image.s3_key)!
		}

		async function mapCharacter(character: CharacterDb) {
			return {
				npcId: character.npc_id,
				name: character.name,
				role: character.role,
				generationStatus: character.ImageGenerationJob[0]?.status ?? null,
				emotionSheet: await mapImage(character.AiDialogueImage[0]),
			}
		}

		const legacyByDialogueId = new Map<number, LegacyCharacterDb[]>()

		for (const character of legacyCharacters) {
			const characters = legacyByDialogueId.get(character.dialogueId) ?? []

			characters.push(character)
			legacyByDialogueId.set(character.dialogueId, characters)
		}

		function getLegacyCharacters(dialogueId: number) {
			return (legacyByDialogueId.get(dialogueId) ?? [])
				.sort((a, b) => a.firstMessageId - b.firstMessageId)
				.map((character) => ({
					npcId: character.npcId,
					name: character.name,
					role: character.role,
					generationStatus: null,
					emotionSheet: null,
				}))
		}

		// Срок подписанной ссылки — 6 часов; обновление рекомендуем через 5 часов, как в /visuals.
		const urlsExpireAt = new Date(Date.now() + 5 * 60 * 60_000).toISOString()

		const items = await Promise.all(
			dialogues.map(async (dialogue) => ({
				id: dialogue.id,
				scenario: dialogue.scenario,
				sourceLanguageCode: dialogue.source_language_code,
				maxCefrLevel: dialogue.max_cefr_level,
				createdAt: dialogue.created_at.toISOString(),
				lastMessage: getAiDialogueLastMessage(lastMessageByDialogueId.get(dialogue.id)),
				sceneImage: await mapImage(sceneByDialogueId.get(dialogue.id)?.AiDialogueImage[0]),
				characters: [
					...getLegacyCharacters(dialogue.id),
					...(await Promise.all(dialogue.AiDialogueCharacter.map(mapCharacter))),
				],
			})),
		)

		return { ...buildPage(items, total, pagination), urlsExpireAt }
	}

	private readPage(userId: number, pagination: PaginationParams) {
		return this.prisma.$transaction(
			async (tx) => {
				const where = { user_id: userId }
				const total = await tx.aiDialogue.count({ where })
				const dialogues = await tx.aiDialogue.findMany({
					where,
					orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
					...toPrismaPagination(pagination),
					select: dialogueSelect,
				})
				const dialogueIds = dialogues.map((dialogue) => dialogue.id)
				const messages = dialogueIds.length ? await this.readLastMessages(tx, dialogueIds) : []
				const legacyCharacters = dialogueIds.length ? await this.readLegacyCharacters(tx, dialogueIds) : []

				return { total, dialogues, messages, legacyCharacters }
			},
			{ isolationLevel: 'RepeatableRead' },
		)
	}

	private async readLastMessages(tx: Prisma.TransactionClient, dialogueIds: number[]) {
		// MAX(id) по двум типам: из БД загружается не больше двух payload на диалог, независимо от длины истории.
		const groups = await tx.aiDialogueMessage.groupBy({
			by: ['dialogue_id', 'type'],
			where: { dialogue_id: { in: dialogueIds }, type: { in: ['npcActions', 'sceneUpdate'] } },
			_max: { id: true },
		})
		const ids = groups.flatMap((group) => (group._max.id === null ? [] : [group._max.id]))
		if (!ids.length) return []
		return tx.aiDialogueMessage.findMany({
			where: { id: { in: ids }, dialogue_id: { in: dialogueIds } },
			select: messageSelect,
		})
	}

	private readLegacyCharacters(tx: Prisma.TransactionClient, dialogueIds: number[]) {
		// Старые npcActions не мигрировались в реестр NPC. Читаем только уникальные публичные метаданные,
		// не загружая историю payload в приложение и не создавая персонажей или заданий генерации.
		return tx.$queryRaw<LegacyCharacterDb[]>(Prisma.sql`
			SELECT DISTINCT ON (m.dialogue_id, m.payload::jsonb ->> 'npcId')
				m.dialogue_id AS "dialogueId", m.id AS "firstMessageId",
				m.payload::jsonb ->> 'npcId' AS "npcId",
				NULLIF(BTRIM(m.payload::jsonb ->> 'npcName'), '') AS name,
				NULLIF(BTRIM(m.payload::jsonb ->> 'npcRole'), '') AS role
			FROM "AiDialogueMessage" m
			WHERE m.dialogue_id IN (${Prisma.join(dialogueIds)})
				AND m.type = 'npcActions' AND m.character_id IS NULL
				AND NULLIF(BTRIM(m.payload::jsonb ->> 'npcId'), '') IS NOT NULL
				AND NOT EXISTS (
					SELECT 1 FROM "AiDialogueCharacter" c
					WHERE c.dialogue_id = m.dialogue_id AND c.npc_id = m.payload::jsonb ->> 'npcId'
				)
			ORDER BY m.dialogue_id, m.payload::jsonb ->> 'npcId', m.id ASC
		`)
	}

	private async mapImage(image: ImageDb): Promise<AiDialogueImageOutModel> {
		return {
			id: image.id,
			url: await this.storage.getFileUrl(image.s3_key),
			mimeType: image.mime_type,
			width: image.width,
			height: image.height,
			layoutVersion: image.layout_version,
		}
	}
}
