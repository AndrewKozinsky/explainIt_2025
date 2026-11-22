import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export function useStartDialogueIllustrationStyle() {
	const catalogQuery = useQuery(aiDialogueQueries.getIllustrationStyles())
	const [preferredStyleId, setPreferredStyleId] = useState(localStorageManager.lastAiDialogueIllustrationStyle.get)
	const catalog = catalogQuery.data

	const selectedStyleId = catalog?.styles.some((style) => style.id === preferredStyleId)
		? preferredStyleId
		: (catalog?.styles.find((style) => style.id === catalog.defaultStyleId)?.id ?? null)

	function changeIllustrationStyle(styleId: string) {
		if (!catalog?.styles.some((style) => style.id === styleId)) return

		setPreferredStyleId(styleId)
		localStorageManager.lastAiDialogueIllustrationStyle.set(styleId)
	}

	return {
		styles: catalog?.styles ?? [],
		selectedStyleId,
		changeIllustrationStyle,
		isPending: catalogQuery.isPending,
		isError: catalogQuery.isError,
		isFetching: catalogQuery.isFetching,
		retry: () => {
			void catalogQuery.refetch()
		},
	}
}
