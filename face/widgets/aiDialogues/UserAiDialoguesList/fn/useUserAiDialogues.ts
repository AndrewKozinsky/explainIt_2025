import { useInfiniteQuery } from '@tanstack/react-query'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'

export function useUserAiDialogues(userId: number) {
	const query = useInfiniteQuery(aiDialogueQueries.getUserDialogues(userId))

	return {
		...query,
		dialogues: query.data?.pages.flatMap((page) => page.items) ?? [],
	}
}
