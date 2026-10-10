import { Injectable } from '@nestjs/common'
import { AiDialogueEvent, ParsedAiDialogueTurn } from 'types/aiDialogueMessage'
import { PrismaService } from 'db/prisma.service'
import {
	AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
	AI_DIALOGUE_VISUAL_STYLE_PROMPT,
	AI_DIALOGUE_USER_AVATAR_S3_KEY,
	AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
	AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
	AI_DIALOGUE_IMAGE_MODEL,
	AI_DIALOGUE_IMAGE_QUALITY,
	AI_DIALOGUE_IMAGE_FORMAT,
	AI_DIALOGUE_EMOTION_SHEET_SIZE,
	AI_DIALOGUE_SCENE_SIZE,
} from 'features/aiDialogue/aiDialogueVisualConfig'
import { Prisma } from 'prisma/generated/client'

type SaveGeneratedTurnInput = {
	dialogueId: number
	turn: ParsedAiDialogueTurn
}

/** Сохраняет подтверждённый ход и все намерения визуальной генерации одной транзакцией. */
@Injectable()
export class AiDialogueTurnRepository {
	constructor(private prisma: PrismaService) {}

	async saveGeneratedTurn(input: SaveGeneratedTurnInput): Promise<number[]> {
		return this.prisma.$transaction(async (tx) => {
			const appearanceByNpcId = new Map(
				input.turn.visualMetadata.npcAppearances.map((item) => [item.npcId, item.appearance]),
			)
			await this.ensureCharacters(tx, input.dialogueId, input.turn.events, appearanceByNpcId)

			const characters = await tx.aiDialogueCharacter.findMany({
				where: { dialogue_id: input.dialogueId },
				select: { id: true, npc_id: true },
			})
			const characterIdByNpcId = new Map(characters.map((character) => [character.npc_id, character.id]))
			const sceneByEventIndex = new Map(
				input.turn.visualMetadata.scenes.map((scene) => [scene.eventIndex, scene]),
			)
			const messageIds: number[] = []

			for (let eventIndex = 0; eventIndex < input.turn.events.length; eventIndex += 1) {
				const event = input.turn.events[eventIndex]
				const metadata = sceneByEventIndex.get(eventIndex)
				const participantNpcIds = (metadata?.participantNpcIds ?? []).filter((npcId) =>
					characterIdByNpcId.has(npcId),
				)
				const savedEvent = withSceneMetadata(event, metadata, participantNpcIds)
				const characterId = event.type === 'npcActions' ? (characterIdByNpcId.get(event.npcId) ?? null) : null
				const message = await this.createMessage(tx, input.dialogueId, savedEvent, characterId)
				messageIds.push(message.id)

				if (savedEvent.type !== 'sceneUpdate') continue
				await this.createJobWithOutbox(tx, {
					dedupKey: `scene-message:${message.id}`,
					type: 'scene',
					messageId: message.id,
					input: {
						dialogueId: input.dialogueId,
						visualDescription: savedEvent.visualDescription,
						participantNpcIds,
						participantCharacterIds: participantNpcIds.map((npcId) => characterIdByNpcId.get(npcId)),
						userAvatarS3Key: AI_DIALOGUE_USER_AVATAR_S3_KEY,
						aspectRatio: '2:1',
						size: AI_DIALOGUE_SCENE_SIZE,
					},
				})
			}

			return messageIds
		})
	}

	private async ensureCharacters(
		tx: Prisma.TransactionClient,
		dialogueId: number,
		events: AiDialogueEvent[],
		appearanceByNpcId: Map<string, string>,
	): Promise<void> {
		for (const event of events) {
			if (event.type !== 'npcActions' || !event.npcId) continue
			const existing = await tx.aiDialogueCharacter.findUnique({
				where: { dialogue_id_npc_id: { dialogue_id: dialogueId, npc_id: event.npcId } },
			})
			if (existing) continue

			const appearance =
				appearanceByNpcId.get(event.npcId) || [event.npcName, event.npcRole].filter(Boolean).join(', ')
			const character = await tx.aiDialogueCharacter.create({
				data: {
					dialogue_id: dialogueId,
					npc_id: event.npcId,
					name: event.npcName || null,
					role: event.npcRole || null,
					appearance: appearance || 'adult person with neutral everyday appearance',
				},
			})
			await this.createJobWithOutbox(tx, {
				dedupKey: `character:${character.id}:${AI_DIALOGUE_EMOTION_LAYOUT_VERSION}`,
				type: 'emotionSheet',
				characterId: character.id,
				input: {
					appearance: character.appearance,
					layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
					aspectRatio: '4:3',
					size: AI_DIALOGUE_EMOTION_SHEET_SIZE,
				},
			})
		}
	}

	private createMessage(
		tx: Prisma.TransactionClient,
		dialogueId: number,
		event: AiDialogueEvent,
		characterId: number | null,
	) {
		const { type, ...payload } = event
		return tx.aiDialogueMessage.create({
			data: { dialogue_id: dialogueId, character_id: characterId, type, payload: JSON.stringify(payload) },
		})
	}

	private async createJobWithOutbox(
		tx: Prisma.TransactionClient,
		input: {
			dedupKey: string
			type: 'emotionSheet' | 'scene'
			characterId?: number
			messageId?: number
			input: Record<string, unknown>
		},
	): Promise<void> {
		const job = await tx.imageGenerationJob.create({
			data: {
				dedup_key: input.dedupKey,
				type: input.type,
				character_id: input.characterId ?? null,
				message_id: input.messageId ?? null,
				input: JSON.stringify({
					model: AI_DIALOGUE_IMAGE_MODEL,
					quality: AI_DIALOGUE_IMAGE_QUALITY,
					format: AI_DIALOGUE_IMAGE_FORMAT,
					stylePrompt: AI_DIALOGUE_VISUAL_STYLE_PROMPT,
					styleAvatarReferenceS3Key: AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
					styleSceneReferenceS3Key: AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
					...input.input,
				}),
			},
		})
		await tx.imageGenerationOutbox.create({ data: { job_id: job.id } })
	}
}

/** Дополняет только sceneUpdate; старые сюжетные поля и формат остальных событий сохраняются. */
function withSceneMetadata(
	event: AiDialogueEvent,
	metadata: ParsedAiDialogueTurn['visualMetadata']['scenes'][number] | undefined,
	participantNpcIds: string[],
): AiDialogueEvent {
	if (event.type !== 'sceneUpdate') return event
	return {
		...event,
		participantNpcIds,
		visualDescription: metadata?.visualDescription || event.visualDescription || event.content,
	}
}
