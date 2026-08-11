import type {
	SentenceModel,
	SentenceTranslationModel,
	SentencePhraseTranslationModel,
	SentencePhraseTranslationExampleModel,
} from './SentenceTypes'

/**
 * Маппит сырые предложения с сервера в унифицированные {@link SentenceModel}.
 * Извлекает текст предложения из processedContent по offset/length,
 * а также пробрасывает переводы.
 *
 * @param processedContent — полный обработанный текст главы/видео
 * @param rawSentences — сырой массив предложений с сервера
 */
export function mapRawSentencesToModels(
	processedContent: string,
	rawSentences: Record<string, unknown>[] | null | undefined,
): SentenceModel[] | null {
	if (!rawSentences || rawSentences.length === 0) return null

	return rawSentences.map((raw) => {
		const startOffset = Math.max(0, (raw.startOffset as number) ?? 0)
		const endOffset = Math.min(processedContent.length, startOffset + Math.max(0, (raw.length as number) ?? 0))

		return {
			id: raw.id as number,
			sentence: processedContent.slice(startOffset, endOffset),
			sentenceTranslation: raw.sentenceTranslation
				? mapToSentenceTranslation(raw.sentenceTranslation as Record<string, unknown>)
				: null,
			sentencePhraseTranslations: raw.sentencePhraseTranslations
				? (raw.sentencePhraseTranslations as Record<string, unknown>[]).map(mapToSentencePhraseTranslation)
				: null,
		}
	})
}

/**
 * Маппит сырые предложения видео в унифицированные {@link SentenceModel}.
 * Отличается от {@link mapRawSentencesToModels} тем, что видео API возвращает
 * `sentenceTranslations` (массив), а не `sentenceTranslation` (один объект).
 * Берёт первый элемент массива как перевод предложения.
 */
export function mapVideoSentencesToModels(
	processedContent: string,
	rawSentences: Record<string, unknown>[] | null | undefined,
): SentenceModel[] | null {
	if (!rawSentences || rawSentences.length === 0) return null

	return rawSentences.map((raw) => {
		const startOffset = Math.max(0, (raw.startOffset as number) ?? 0)
		const endOffset = Math.min(processedContent.length, startOffset + Math.max(0, (raw.length as number) ?? 0))

		const translations = raw.sentenceTranslations as Record<string, unknown>[] | null | undefined
		const firstTranslation = translations?.[0] ?? null

		return {
			id: raw.id as number,
			sentence: processedContent.slice(startOffset, endOffset),
			sentenceTranslation: firstTranslation
				? {
						id: firstTranslation.id as number,
						sentenceId: raw.id as number,
						translation: firstTranslation.translation as string,
					}
				: null,
			sentencePhraseTranslations: raw.sentencePhraseTranslations
				? (raw.sentencePhraseTranslations as Record<string, unknown>[]).map(mapToSentencePhraseTranslation)
				: null,
		}
	})
}

export function mapToSentenceTranslation(raw: Record<string, unknown>): SentenceTranslationModel {
	return {
		id: raw.id as number,
		sentenceId: raw.sentenceId as number,
		translation: raw.translation as string,
	}
}

export function mapToSentencePhraseTranslation(raw: Record<string, unknown>): SentencePhraseTranslationModel {
	return {
		id: raw.id as number,
		sentenceId: raw.sentenceId as number,
		phrase: raw.phrase as string,
		phraseStartOffset: raw.phraseStartOffset as number,
		phraseEndOffset: raw.phraseEndOffset as number,
		translate: (raw.translate as string) ?? null,
		examples: raw.examples ? (raw.examples as Record<string, unknown>[]).map(mapToExample) : [],
		status: (raw.status as SentencePhraseTranslationModel['status']) ?? 'pending',
		errorMessage: (raw.errorMessage as string) ?? null,
		flashcardId: (raw.flashcardId as number) ?? null,
	}
}

export function mapToExample(raw: Record<string, unknown>): SentencePhraseTranslationExampleModel {
	return {
		text: raw.text as string,
		translate: raw.translate as string,
	}
}
