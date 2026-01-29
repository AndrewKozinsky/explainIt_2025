import { useEffect } from 'react'
import { useSentenceTranslation_GetBySentenceIdLazyQuery } from '@/graphql'
import {
	SentenceTranslationLite,
	SentenceTranslationProvider,
	useSelectedSentenceStore,
} from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'

export function useSyncSentenceTranslations() {
	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)

	const [fetchTranslations, { data, loading }] = useSentenceTranslation_GetBySentenceIdLazyQuery()

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
		[data, loading, sentenceId],
	)
}

function mapSentenceTranslation(input: {
	id: number
	sentenceId: number
	provider: string
	translation: string
	analysis?: null | string
	createdAt: string
}): SentenceTranslationLite | null {
	const provider = safeReadProvider(input.provider)
	if (!provider) return null

	return {
		id: input.id,
		sentenceId: input.sentenceId,
		provider,
		translation: input.translation,
		analysis: input.analysis ?? null,
		createdAt: input.createdAt,
	}
}

function safeReadProvider(provider: string): SentenceTranslationProvider | null {
	if (provider === 'yandexTranslate') return provider
	if (provider === 'chatGPTNano') return provider
	if (provider === 'chatGPTMini') return provider
	if (provider === 'chatGPTStandard') return provider

	return null
}
