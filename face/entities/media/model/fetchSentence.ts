import { translateService } from '@/entities/translate/TranslateService'
import { MediaTranslationContext } from './mediaTranslationContext'
import { mapPhrase } from './prepareData'

export async function fetchSentence(
	input: MediaTranslationContext & { sentenceId: number; sentenceText: string; targetLanguageCode: string },
) {
	input.mediaStore.getState().patchSentenceTranslation({
		sentenceId: input.sentenceId,
		patch: { loading: true, error: null, visible: true },
	})

	try {
		const result = await translateService.translateSentence({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
		})

		if (result.error || !result.data.translation) throw new Error()

		input.mediaStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: {
				text: result.data.translation,
				translation: result.data.translation,
				loading: false,
				error: null,
			},
		})

		const cached = await translateService.getPhraseTranslationsBySentence({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
		})

		if (!cached.error)
			for (const phrase of cached.data) {
				input.mediaStore.getState().upsertPhraseTranslation({
					sentenceId: input.sentenceId,
					phrase: mapPhrase(phrase, input.sentenceText, input.languageCode ?? null),
				})
			}
	} catch {
		input.mediaStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: { loading: false, error: 'Не удалось получить перевод предложения' },
		})
	}
}
