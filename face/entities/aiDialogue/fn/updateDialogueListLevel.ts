import type { AiDialogueModel } from '../repository/AiDialogueRepository'
import type { AiDialoguesPageModel } from '../types/aiDialogueList'
import type { InfiniteData } from '@tanstack/react-query'

/** После PATCH обновляет только CEFR, сохраняя изображения, NPC и последнее сообщение карточки. */
export function updateDialogueListLevel(
	data: InfiniteData<AiDialoguesPageModel> | undefined,
	dialogue: AiDialogueModel,
) {
	if (!data) return data

	return {
		...data,
		pages: data.pages.map((page) => ({
			...page,
			items: page.items.map((item) =>
				item.id === dialogue.id ? { ...item, maxCefrLevel: dialogue.maxCefrLevel } : item,
			),
		})),
	}
}
