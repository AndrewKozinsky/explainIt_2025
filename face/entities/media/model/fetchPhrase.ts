import { translateService } from '@/entities/translate/TranslateService'
import { MediaTranslationContext } from './mediaTranslationContext'
import { mapPhrase } from './prepareData'

export async function fetchPhrase(
	input: MediaTranslationContext & {
		sentenceId: number
		sentenceText: string
		phraseId: string
		wordStartOffset: number
		wordEndOffset: number
		targetLanguageCode: string
	},
) {
	try {
		const cached = await translateService.getPhraseTranslation({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			selectedWordStartOffset: input.wordStartOffset,
			selectedWordEndOffset: input.wordEndOffset,
		})

		let phrase = cached.data

		if (!phrase?.translation) {
			const generated = await translateService.translatePhrase({
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				selectedWord: input.sentenceText.slice(input.wordStartOffset, input.wordEndOffset),
				targetLanguageCode: input.targetLanguageCode,
				selectedWordStartOffset: input.wordStartOffset,
				selectedWordEndOffset: input.wordEndOffset,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
			})

			if (generated.error || !generated.data.translation) throw new Error()
			phrase = generated.data
		}

		input.mediaStore.getState().finalizePhraseTranslation({
			sentenceId: input.sentenceId,
			placeholderPhraseId: input.phraseId,
			phrase: mapPhrase(phrase, input.sentenceText, input.languageCode ?? null),
		})
	} catch {
		input.mediaStore.getState().patchPhraseTranslation({
			sentenceId: input.sentenceId,
			phraseId: input.phraseId,
			patch: { loading: false, error: 'Не удалось получить перевод слова' },
		})
	}
}
