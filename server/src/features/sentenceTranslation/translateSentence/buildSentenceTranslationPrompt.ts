type TranslationTaskMedia = {
	sourceLanguageCode: string
	targetLanguageCode: string
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export function buildSentenceTranslationPrompt(media: TranslationTaskMedia) {
	return `${getTaskIntro(media)}

Первой строкой пиши перевод всего текста.
Вторая строка пустая.

Далее пиши следующую структуру ответа в формате Markdown:

*   **слово/фраза** — перевод.
    *   Короткий пример 1 с переводом.
    *   Короткий пример 2 с переводом.
[Разбирай все слова. Группируй фразовые глаголы и идиомы.]

Правила:
1.  Примеры должны быть короткими, релевантными и иллюстрировать именно то значение/конструкцию, которая разбирается.
2.  Английские слова и фразы в тексте ответа оформляй в backticks: \`like this\`.`
}

function getTaskIntro(media?: {
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}) {
	if (media?.bookName || media?.bookAuthor) {
		const bookName = media.bookName ?? ''
		const author = media.bookAuthor ?? ''
		const bookDetails = [bookName, author].filter(Boolean).join(' автора ')

		return (
			'Ты — помощник для изучения английского через чтение книги' +
			(bookDetails ? ` ${bookDetails}` : '') +
			'. Ответ присылай в формате Markdown (md)'
		)
	}

	if (media?.videoName || media?.videoYear) {
		const videoName = media.videoName ?? ''
		const year = media.videoYear ? `(${media.videoYear})` : ''
		const details = [videoName, year].filter(Boolean).join(' ')

		return (
			'Ты — помощник для изучения английского через просмотр фильма' +
			(details ? ` ${details}` : '') +
			'. Ответ присылай в формате Markdown (md)'
		)
	}

	return 'Ты — помощник для изучения английского. Ответ присылай в формате Markdown (md)'
}
