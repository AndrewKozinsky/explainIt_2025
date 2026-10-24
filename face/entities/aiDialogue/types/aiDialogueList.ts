import type { LanguageCode } from '@/shared/utils/languages'
import type { AiDialogueCefrLevel } from '../repository/AiDialogueRepository'

export type DialogueListImage = {
	id: number
	url: string
	mimeType: string
	width: number
	height: number
	layoutVersion: string | null
}

export type DialogueListCharacter = {
	npcId: string
	name: string | null
	role: string | null
	generationStatus: 'queued' | 'waitingDependencies' | 'generating' | 'ready' | 'failed' | null
	emotionSheet: DialogueListImage | null
}

export type AiDialogueListItemModel = {
	id: number
	scenario: { id: number; title: string }
	sourceLanguageCode: LanguageCode
	maxCefrLevel: AiDialogueCefrLevel | null
	createdAt: string
	lastMessage: {
		id: number
		npcId: string | null
		name: string | null
		role: string | null
		text: string
		textType: 'speech' | 'action' | null
		createdAt: string
	} | null
	sceneImage: DialogueListImage | null
	characters: DialogueListCharacter[]
}

export type AiDialoguesPageModel = {
	items: AiDialogueListItemModel[]
	page: number
	pageSize: number
	total: number
	totalPages: number
	urlsExpireAt: string
}

export type GetUserDialoguesParams = { page: number; pageSize: number }
