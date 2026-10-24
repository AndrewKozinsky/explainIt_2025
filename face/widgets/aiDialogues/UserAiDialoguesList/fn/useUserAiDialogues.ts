import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'

export function useUserAiDialogues(userId: number) {
	const query = useInfiniteQuery(aiDialogueQueries.getUserDialogues(userId))
	// Страницы API всегда по 10; окно карточек начинается с 3 и расширяется независимо от кэша.
	const [visibility, setVisibility] = useState({ userId, count: 3 })
	const visibleCount = visibility.userId === userId ? visibility.count : 3
	const items = query.data?.pages.flatMap((page) => page.items) ?? []
	const total = query.data?.pages[0]?.total ?? 0

	async function loadMore() {
		if (query.isFetching) return
		const nextCount = visibleCount + 10

		if (items.length < nextCount && query.hasNextPage) {
			const result = await query.fetchNextPage()
			if (result.isError) return
		}

		setVisibility({ userId, count: nextCount })
	}

	return {
		...query,
		dialogues: items.slice(0, visibleCount),
		hasMore: items.length > visibleCount || total > items.length,
		loadMore,
	}
}
