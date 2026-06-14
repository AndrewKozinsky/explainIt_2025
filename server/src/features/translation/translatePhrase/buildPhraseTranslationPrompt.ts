import { Language, languages } from 'utils/languages'

type BuildPhraseTranslationPromptInput = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	sentenceText: string
	selectedWord: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export function buildPhraseTranslationPrompt(input: BuildPhraseTranslationPromptInput) {
	const targetLanguage = languages[input.targetLanguageCode].nameEng
	const sourceLanguage = languages[input.sourceLanguageCode].nameEng

	const mediaContext = buildMediaContext({
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
		videoYear: input.videoYear,
	})

	return `Ты — помощник для изучения ${sourceLanguage} языка.${mediaContext}

Тебе дано предложение:
"${input.sentenceText}"

Пользователь выделил слово:
- text: "${input.selectedWord}"
- startOffset: ${input.selectedWordStartOffset}
- endOffset: ${input.selectedWordEndOffset}

Твоя задача:
1) Определи смысловую фразу, к которой относится выделение.
2) Переведи эту фразу на ${targetLanguage} язык.
3) Дай короткие примеры.

Верни ответ строго как многострочный текст без markdown и без пояснений:
- Строка 1: фраза на исходном языке.
- Строка 2: перевод этой фразы на ${targetLanguage} язык.
- Строка 3: пример употребления фразы на исходном языке (необязательно).
- Строка 4: перевод примера (необязательно).
- Строки 5+ по той же схеме парами (пример / перевод примера).

Правила:
- phrase должна быть подстрокой исходного предложения.
- Не добавляй нумерацию строк, заголовки, JSON и ключи полей.
- Если примеров нет, верни только первые 2 строки.`
}

function buildMediaContext(input: {
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}) {
	if (input.bookName || input.bookAuthor) {
		const details = [input.bookName ?? '', input.bookAuthor ? `author: ${input.bookAuthor}` : '']
			.filter(Boolean)
			.join(', ')
		return details ? ` Context: book (${details}).` : ''
	}

	if (input.videoName || input.videoYear) {
		const details = [input.videoName ?? '', input.videoYear ? `year: ${input.videoYear}` : '']
			.filter(Boolean)
			.join(', ')
		return details ? ` Context: movie (${details}).` : ''
	}

	return ''
}
