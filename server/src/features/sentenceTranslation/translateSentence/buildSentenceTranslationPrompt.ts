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

Первой строкой пиши перевод всего текста на ${targetLanguage} язык.
Вторая строка пустая.

Далее пиши следующую структуру ответа в формате Markdown:

*   **слово/фраза** — перевод.
    *   Короткий пример 1 с переводом.
    *   Короткий пример 2 с переводом.
[Разбирай все слова. Группируй фразовые глаголы и идиомы.]

Правила:
1.  Примеры должны быть короткими, релевантными и иллюстрировать именно то значение/конструкцию, которая разбирается.
2.  Слова и фразы исходного языка в тексте ответа оформляй в backticks: \`like this\`.
3.  Переводи ВСЕ слова. Пропускай только служебные слова: артикли, предлоги, союзы, вспомогательные глаголы, местоимения.`
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
			'. Ответ присылай в формате Markdown (md)'
		)
	}

	if (media.videoName || media.videoYear) {
		const videoName = media.videoName ?? ''
		const year = media.videoYear ? `(${media.videoYear})` : ''
		const details = [videoName, year].filter(Boolean).join(' ')

		return (
			`Ты — помощник для изучения ${sourceLanguage} языка через просмотр фильма` +
			(details ? ` ${details}` : '') +
			'. Ответ присылай в формате Markdown (md)'
		)
	}

	return `Ты — помощник для изучения ${sourceLanguage} языка. Ответ присылай в формате Markdown (md)`
}
