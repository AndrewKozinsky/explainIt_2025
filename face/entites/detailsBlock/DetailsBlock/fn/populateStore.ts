import { useEffect } from 'react'
import type { SentenceModel } from '@/entites/media/repository/SentenceTypes'
import { useDetailsStore, makePhraseId, DetailsSentenceEntry, SentencePhraseType } from '../../detailsStore'
import { wordIdsFromOffsets } from './wordSegmentation'

/**
 * Принимает готовые {@link SentenceModel} (полученные страницей с сервера),
 * маппит их в {@link DetailsSentenceEntry} и кладёт в {@link useDetailsStore}.
 *
 * Больше не ходит на сервер — страницы передают уже загруженные данные.
 * Это позволяет подменять источник данных при тестировании.
 */
export function usePopulateStore(sentences: SentenceModel[] | null | undefined, languageCode: null | string): void {
	const store = useDetailsStore.getState()

	useEffect(
		function () {
			if (!sentences || sentences.length === 0) return

			const entries = mapSentenceModelsToEntries(sentences, languageCode)

			store.updateStore({ sentences: entries })
		},
		[sentences, languageCode],
	)
}

function mapSentenceModelsToEntries(sentences: SentenceModel[], languageCode: null | string): DetailsSentenceEntry[] {
	return sentences.map((sentence) => {
		const translation = sentence.sentenceTranslation?.translation ?? null

		return {
			sentenceId: sentence.id,
			sentenceText: sentence.sentence,
			selectedPhraseId: null,
			data: {
				translation: {
					text: translation ?? '',
					loading: translation === null,
					error: null,
					translation,
					visible: false,
				},
				phrases: mapSentencePhrases({
					phraseTranslations: sentence.sentencePhraseTranslations ?? [],
					sentenceText: sentence.sentence,
					languageCode,
				}),
			},
		}
	})
}

function mapSentencePhrases(input: {
	phraseTranslations: NonNullable<SentenceModel['sentencePhraseTranslations']>
	sentenceText: string
	languageCode: null | string
}): SentencePhraseType[] {
	const { phraseTranslations, sentenceText, languageCode } = input

	return phraseTranslations.map((pt) => ({
		randomGeneratedPhraseId: makePhraseId(),
		sentencePhraseId: pt.id,
		flashcardId: pt.flashcardId ?? null,
		wordIds: wordIdsFromOffsets({
			sentenceText,
			locale: languageCode,
			startOffset: pt.phraseStartOffset,
			endOffset: pt.phraseEndOffset,
		}),
		phrase: pt.phrase,
		loading: false,
		error: pt.status === 'error' ? (pt.errorMessage ?? 'Unknown error') : null,
		translation: pt.translate ?? null,
		examples: pt.examples ?? [],
	}))
}
