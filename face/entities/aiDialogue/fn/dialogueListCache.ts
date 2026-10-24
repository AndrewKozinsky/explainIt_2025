import type { AiDialogueModel } from '../repository/AiDialogueRepository'
import type { AiDialoguesPageModel } from '../types/aiDialogueList'
import type { InfiniteData } from '@tanstack/react-query'

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

/** Обновляем ссылки до истечения срока, а недавно созданные картинки — пока они готовятся. */
export function getDialogueListRefreshInterval(data: InfiniteData<AiDialoguesPageModel> | undefined): number | false {
	if (!data?.pages.length) return false

	const now = Date.now()
	const pending = data.pages
		.flatMap((page) => page.items)
		.filter((item) => {
			const recentMessage = item.lastMessage && now - Date.parse(item.lastMessage.createdAt) < 5 * 60_000
			return (
				(recentMessage && !item.sceneImage) ||
				item.characters.some((character) =>
					['queued', 'waitingDependencies', 'generating'].includes(character.generationStatus ?? ''),
				)
			)
		})

	if (pending.length) {
		const ages = pending.map((item) => now - Date.parse(item.lastMessage?.createdAt ?? item.createdAt))
		const youngest = Math.min(...ages)
		return youngest < 2 * 60_000 ? 15_000 : youngest < 5 * 60_000 ? 30_000 : 60_000
	}

	const expires = data.pages.map((page) => Date.parse(page.urlsExpireAt)).filter(Number.isFinite)

	return expires.length ? Math.min(2_147_483_647, Math.max(60_000, Math.min(...expires) - now - 60_000)) : false
}
