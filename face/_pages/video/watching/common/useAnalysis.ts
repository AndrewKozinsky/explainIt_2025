import { useCallback } from 'react'
import { extractGraphQLError } from 'graphql/extractGraphQLError'
import { useTranslate_TranslatePhrase } from '@/graphql'
import { useWatchingStore } from '_pages/video/watching/watchingStore'

export function useGetFetchAnalysisAndSetInStore() {
	const updateAnalysis = useWatchingStore((s) => s.updateAnalysis)

	// Apollo codegen mutation hooks usually return a tuple: [mutateFn, { data, loading, error }]
	const [translatePhrase] = useTranslate_TranslatePhrase()

	// Returns a function that triggers translation on demand and saves result into Zustand
	return useCallback(
		async (opts?: { phrase?: string; sourceLanguageCode?: string; targetLanguageCode?: string }) => {
			const selectedItem =
				useWatchingStore.getState().selectedText.plainText ?? useWatchingStore.getState().selectedText.subtitle
			if (!selectedItem) return

			const engText = selectedItem.wordsTexts.join(' ').trim()
			if (!engText) return

			// Immediately set loading state in the store
			updateAnalysis({ engText, analysis: { type: 'loading' } })

			try {
				await translatePhrase({
					variables: {
						input: {
							text: engText,
							sourceLanguageCode: opts?.sourceLanguageCode ?? 'en',
							targetLanguageCode: opts?.targetLanguageCode ?? 'ru',
						},
					},
					onCompleted: (result) => {
						const analysis = result?.translate_translate_phrase
						if (!analysis) return

						updateAnalysis({
							engText: analysis.engPhrase ?? engText,
							analysis: {
								type: 'data',
								rusText: analysis.rusPhrase ?? '',
								transcription: analysis.transcription ?? undefined,
								lexemes: analysis.lexemes ? JSON.parse(analysis.lexemes) : null,
							},
						})
					},
					onError: (error) => {
						const message =
							extractGraphQLError(error)?.message ||
							error?.message ||
							'При переводе возникла неизвестная ошибка'
						updateAnalysis({
							engText,
							analysis: { type: 'error', message },
						})
					},
				})
			} catch (err) {
				console.error('useGetAnalysis translatePhrase error:', err)
			}
		},
		[translatePhrase, updateAnalysis],
	)
}
