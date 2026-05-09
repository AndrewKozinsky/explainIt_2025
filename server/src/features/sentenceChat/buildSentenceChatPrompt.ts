import { Content } from '@google/genai'
import { SentenceChatMessageRole } from 'prisma/generated/enums'
import { SentenceNeighbors, SentenceSourceInfo } from './SentenceChatContextBuilder.service'

/** Строит systemInstruction для Gemini. */
export function buildSentenceChatSystemInstruction(input: {
	source: SentenceSourceInfo
	neighbors: SentenceNeighbors
}): string {
	const { source, neighbors } = input

	const sourceLines: string[] = []
	if (source.kind === 'book') {
		if (source.bookName) sourceLines.push(`Название книги: «${source.bookName}».`)
		if (source.bookAuthor) sourceLines.push(`Автор: ${source.bookAuthor}.`)
	} else {
		if (source.videoName) sourceLines.push(`Название фильма/видео: «${source.videoName}».`)
		if (source.videoYear) sourceLines.push(`Год: ${source.videoYear}.`)
	}

	const beforeBlock = neighbors.before.length ? neighbors.before.join(' ') : '(нет)'
	const afterBlock = neighbors.after.length ? neighbors.after.join(' ') : '(нет)'

	return [
		'Ты помогаешь пользователю разобраться с иностранным предложением из книги или фильма.',
		'Пользователь изучает язык; отвечай на русском языке, если пользователь явно не попросит иначе.',
		'Объясняй кратко и по делу. Форматируй ответ в Markdown: используй списки, жирный текст и цитаты, где уместно.',
		'Если в предложении есть идиома, сленг или культурная отсылка — укажи это отдельно.',
		'',
		'Контекст источника:',
		sourceLines.length ? sourceLines.join(' ') : '(источник неизвестен)',
		'',
		'Предложения до выделенного:',
		beforeBlock,
		'',
		'Выделенное пользователем предложение:',
		neighbors.selected,
		'',
		'Предложения после выделенного:',
		afterBlock,
	].join('\n')
}

/** Преобразует историю сообщений в формат contents для Gemini. */
export function buildSentenceChatContents(input: {
	history: Array<{ role: SentenceChatMessageRole; content: string }>
	newUserQuestion: string
}): Content[] {
	const contents: Content[] = []

	for (const message of input.history) {
		if (!message.content) continue
		contents.push({
			role: message.role === 'assistant' ? 'model' : 'user',
			parts: [{ text: message.content }],
		})
	}

	contents.push({
		role: 'user',
		parts: [{ text: input.newUserQuestion }],
	})

	return contents
}
