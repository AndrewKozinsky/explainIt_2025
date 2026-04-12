import { useEffect } from 'react'
import { SentencePhraseTranslationOutModel, useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery } from '@/graphql'
import { useDetailsStore } from '../../detailsStore'

export function useWordAnalyses() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const wordAnalysis = useDetailsStore((s) => s.wordAnalysis)
	const [getPhraseTranslationsBySentence] = useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery()

	useEffect(
		function () {
			if (!sentenceId) {
				useDetailsStore.getState().updateStore({
					wordAnalyses: [],
				})
				return
			}

			let cancelled = false

			useDetailsStore.getState().updateStore({
				wordAnalyses: [],
			})

			void (async () => {
				try {
					const response = await getPhraseTranslationsBySentence({
						variables: {
							input: {
								sentenceId,
							},
						},
						fetchPolicy: 'network-only',
					})

					if (cancelled) {
						return
					}

					const phraseTranslations = response.data?.translate_get_phrase_translations_by_sentence ?? []

					useDetailsStore.getState().updateStore({
						wordAnalyses: phraseTranslations.map(buildWordAnalysisFromPhraseTranslation),
					})
				} catch {
					if (cancelled) {
						return
					}

					useDetailsStore.getState().updateStore({
						wordAnalyses: [],
					})
				}
			})()

			return () => {
				cancelled = true
			}
		},
		[sentenceId, wordAnalysis, getPhraseTranslationsBySentence],
	)
}

function buildWordAnalysisFromPhraseTranslation(phraseTranslation: SentencePhraseTranslationOutModel): string {
	const lines = [`* **${phraseTranslation.phrase}** — ${phraseTranslation.translate ?? ''}`]

	for (const example of phraseTranslation.examples ?? []) {
		if (!example.text || !example.translate) {
			continue
		}

		lines.push(`* ${example.text} — ${example.translate}`)
	}

	return lines.join('\n')
}
