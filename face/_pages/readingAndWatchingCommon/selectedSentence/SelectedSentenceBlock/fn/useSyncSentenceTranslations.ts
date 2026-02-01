import { useEffect } from 'react'
import { useSentenceTranslation_GetBySentenceIdLazyQuery } from '@/graphql'
import {
	SentenceTranslationLite,
	useSelectedSentenceStore,
} from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'

export function useSyncSentenceTranslations() {
	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)

	const [fetchTranslations, { data, loading, called }] = useSentenceTranslation_GetBySentenceIdLazyQuery()

	useEffect(
		function () {
			if (!sentenceId) return

			useSelectedSentenceStore.getState().updateStore({
				translation: null,
				analysis: null,
				sentenceTranslations: [],
				sentenceTranslationsLoading: true,
			})

			fetchTranslations({ variables: { input: { sentenceId } } })
		},
		[fetchTranslations, sentenceId],
	)

	useEffect(
		function () {
			if (!sentenceId) return

			if (loading) {
				useSelectedSentenceStore.getState().updateStore({ sentenceTranslationsLoading: true })
				return
			}

			if (!called) return

			const translations = data?.sentence_translation_get_by_sentence_id
			if (!translations) {
				useSelectedSentenceStore.getState().updateStore({ sentenceTranslationsLoading: false })
				return
			}

			const mappedTranslations = translations
				.map(mapSentenceTranslation)
				.filter((t): t is SentenceTranslationLite => t !== null)

			useSelectedSentenceStore.getState().setSentenceTranslations(mappedTranslations)
			useSelectedSentenceStore.getState().updateStore({ sentenceTranslationsLoading: false })
		},
		[data, loading, called, sentenceId],
	)
}

function mapSentenceTranslation(input: {
	id: number
	sentenceId: number
	translation: string
	analysis?: null | string
	createdAt: string
}): SentenceTranslationLite | null {
	return {
		id: input.id,
		sentenceId: input.sentenceId,
		translation: input.translation,
		analysis: input.analysis ?? null,
		createdAt: input.createdAt,
	}
}
