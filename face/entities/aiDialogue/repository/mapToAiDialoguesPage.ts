import type {
	AiDialogueImageOutModel,
	AiDialogueLastMessageOutModel,
	AiDialoguesPageOutModel,
} from '@/shared/api/generated/models'
import type { AiDialoguesPageModel } from '../types/aiDialogueList'

export function mapToAiDialoguesPage(raw: AiDialoguesPageOutModel): AiDialoguesPageModel {
	return {
		...raw,
		items: raw.items.map((dialogue) => ({
			...dialogue,
			sceneImage: mapImage(dialogue.sceneImage),
			lastMessage: mapLastMessage(dialogue.lastMessage),
			characters: dialogue.characters.map((character) => ({
				...character,
				emotionSheet: mapImage(character.emotionSheet),
				name: character.name ?? null,
				role: character.role ?? null,
				generationStatus: character.generationStatus ?? null,
			})),
		})),
	}
}

function mapImage(image: AiDialogueImageOutModel | null) {
	return image ? { ...image, layoutVersion: image.layoutVersion ?? null } : null
}

function mapLastMessage(message: AiDialogueLastMessageOutModel | null) {
	if (!message) return null

	return {
		...message,
		npcId: message.npcId ?? null,
		name: message.name ?? null,
		role: message.role ?? null,
		textType: message.textType ?? null,
	}
}
