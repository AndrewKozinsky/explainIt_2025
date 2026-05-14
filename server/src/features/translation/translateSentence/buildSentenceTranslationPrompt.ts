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
	return `${getTaskIntro(media)}

Return the sentence translated into ${languages[media.targetLanguageCode].nameEng}. Do not add explanations or extra text.`
}

function getTaskIntro(media: TranslationTaskMedia) {
	const sourceLanguage = languages[media.sourceLanguageCode].nameEng

	if (media.bookName || media.bookAuthor) {
		const bookName = media.bookName ?? ''
		const author = media.bookAuthor ?? ''
		const bookDetails = [bookName, author].filter(Boolean).join(' by ')

		return (
			`You are an assistant for learning ${sourceLanguage} through reading the book` +
			(bookDetails ? ` ${bookDetails}` : '') +
			'.'
		)
	}

	if (media.videoName || media.videoYear) {
		const videoName = media.videoName ?? ''
		const year = media.videoYear ? `(${media.videoYear})` : ''
		const details = [videoName, year].filter(Boolean).join(' ')

		return (
			`You are an assistant for learning ${sourceLanguage} through watching the movie` +
			(details ? ` ${details}` : '') +
			'.'
		)
	}

	return `You are an assistant for learning ${sourceLanguage}.`
}
