import { Language, languages } from 'utils/languages'

type TranslationTaskMedia = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export function buildSentenceTranslationPrompt(media: TranslationTaskMedia) {
	const targetLanguage = languages[media.targetLanguageCode].nameRus

	return `${getTaskIntro(media)}

Верни перевод предложения на ${targetLanguage} язык. Без пояснений и доп. текста.`
}

function getTaskIntro(media: {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}) {
	const sourceLanguage = languages[media.sourceLanguageCode].nameRus

	if (media.bookName || media.bookAuthor) {
		const bookName = media.bookName ?? ''
		const author = media.bookAuthor ?? ''
		const bookDetails = [bookName, author].filter(Boolean).join(' автора ')

		return (
			`Ты — помощник для изучения ${sourceLanguage} языка через чтение книги` +
			(bookDetails ? ` ${bookDetails}` : '') +
			'.'
		)
	}

	if (media.videoName || media.videoYear) {
		const videoName = media.videoName ?? ''
		const year = media.videoYear ? `(${media.videoYear})` : ''
		const details = [videoName, year].filter(Boolean).join(' ')

		return (
			`Ты — помощник для изучения ${sourceLanguage} языка через просмотр фильма` +
			(details ? ` ${details}` : '') +
			'.'
		)
	}

	return `Ты — помощник для изучения ${sourceLanguage} языка.`
}
