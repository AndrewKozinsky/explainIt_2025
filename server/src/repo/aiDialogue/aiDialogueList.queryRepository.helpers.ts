import { buildPage, toPrismaPagination } from 'utils/pagination'
import { pickLocalized } from 'utils/pickLocalized'
import type { AiDialogueExamLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { getExamMedalUrl } from 'features/aiDialogue/exam/aiDialogueMedal'
import { getAiDialogueLastMessage } from 'features/aiDialogue/getAiDialogueLastMessage'
import type { AiDialogueListExamOutModel, AiDialoguesPageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'
import type { Prisma } from 'prisma/generated/client'
import type { PaginationParams } from 'types/pagination'
import type { Language } from 'utils/languages'

const imageKeySelect = { s3_key: true } as const

type GetFileUrl = (key: string) => Promise<string>
type AiDialogueListPage = Awaited<ReturnType<typeof readAiDialogueListPage>>

export async function mapAiDialogueListPage(
	snapshot: AiDialogueListPage,
	pagination: PaginationParams,
	getFileUrl: GetFileUrl,
	locale: Language,
): Promise<AiDialoguesPageOutModel> {
	const { total, dialogues, scenes, messages } = snapshot
	const scenesByDialogueId = new Map(scenes.map((scene) => [scene.dialogue_id, scene.AiDialogueImage[0]?.s3_key]))
	const messagesByDialogueId = new Map(messages.map((message) => [message.dialogue_id, message]))

	const signedUrls = new Map<string, Promise<string>>()
	function signImage(key?: string) {
		if (!key) return Promise.resolve(null)

		const existing = signedUrls.get(key)
		if (existing) return existing

		const url = getFileUrl(key)
		signedUrls.set(key, url)

		return url
	}

	const items = await Promise.all(
		dialogues.map(async (dialogue) => {
			const message = messagesByDialogueId.get(dialogue.id)
			const npcMessage = message?.type === 'npcActions' ? getAiDialogueLastMessage(message.payload) : null
			const character = message?.character

			return {
				id: dialogue.id,
				scenarioTitle: pickLocalized(dialogue.scenario.title, locale),
				sourceLanguageCode: dialogue.source_language_code,
				cefrLevel: dialogue.cefr_level,
				mode: dialogue.mode,
				sceneImageUrl: await signImage(scenesByDialogueId.get(dialogue.id)),
				lastMessage: npcMessage && {
					...npcMessage,
					name: npcMessage.name ?? character?.name ?? null,
					role: npcMessage.role ?? character?.role ?? null,
					avatarUrl: await signImage(character?.AiDialogueImage[0]?.s3_key),
				},
				exam:
					dialogue.mode === 'exam'
						? getExamSummary(
								dialogue.scenario.medal_s3_keys,
								message?.type === 'examResult' ? message.payload : undefined,
							)
						: null,
			}
		}),
	)

	return buildPage(items, total, pagination)
}

function getExamSummary(medalKeys: string | null, payload?: string): AiDialogueListExamOutModel {
	if (!payload) return { status: 'inProgress', level: null, medalUrl: null }
	const { level } = JSON.parse(payload) as { level: AiDialogueExamLevel }
	if (level === 'A0') return { status: 'failed', level: null, medalUrl: null }
	return { status: 'passed', level, medalUrl: getExamMedalUrl(medalKeys, level) }
}

/** Читает только страницу владельца и по два выбранных сообщения на диалог. */
export async function readAiDialogueListPage(
	tx: Prisma.TransactionClient,
	userId: number,
	pagination: PaginationParams,
) {
	const where = { user_id: userId }
	const total = await tx.aiDialogue.count({ where })
	const dialogues = await tx.aiDialogue.findMany({
		where,
		orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
		...toPrismaPagination(pagination),
		select: {
			id: true,
			source_language_code: true,
			cefr_level: true,
			mode: true,
			scenario: { select: { title: true, medal_s3_keys: true } },
		},
	})

	if (!dialogues.length) return { total, dialogues, scenes: [], messages: [] }

	const dialogueIds = dialogues.map(({ id }) => id)
	const practiceIds = dialogues.filter(({ mode }) => mode === 'practice').map(({ id }) => id)
	const examIds = dialogues.filter(({ mode }) => mode === 'exam').map(({ id }) => id)
	const groups = await tx.aiDialogueMessage.groupBy({
		by: ['dialogue_id', 'type'],
		where: {
			OR: [
				{ dialogue_id: { in: dialogueIds }, type: 'sceneUpdate' },
				{ dialogue_id: { in: practiceIds }, type: 'npcActions' },
				{ dialogue_id: { in: examIds }, type: 'examResult' },
			],
		},
		_max: { id: true },
	})

	const sceneIds: number[] = []
	const messageIds: number[] = []
	for (const { type, _max } of groups) {
		if (_max.id === null) continue
		const ids = type === 'sceneUpdate' ? sceneIds : messageIds
		ids.push(_max.id)
	}

	const scenes = sceneIds.length
		? await tx.aiDialogueMessage.findMany({
				where: { id: { in: sceneIds }, dialogue_id: { in: dialogueIds } },
				select: {
					dialogue_id: true,
					AiDialogueImage: { where: { type: 'scene' }, take: 1, select: imageKeySelect },
				},
			})
		: []
	const messages = messageIds.length
		? await tx.aiDialogueMessage.findMany({
				where: { id: { in: messageIds }, dialogue_id: { in: dialogueIds } },
				select: {
					dialogue_id: true,
					type: true,
					payload: true,
					character: {
						select: {
							name: true,
							role: true,
							AiDialogueImage: { where: { type: 'emotionSheet' }, take: 1, select: imageKeySelect },
						},
					},
				},
			})
		: []

	return { total, dialogues, scenes, messages }
}
