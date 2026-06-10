import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { SentenceChatMessageRole } from 'prisma/generated/enums'
import { SentenceNeighbors, SentenceSourceInfo } from './SentenceChatContextBuilder.service'

/** Строит systemInstruction для LLM. */
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
		'Объясняй кратко и по делу. Форматируй ответ в Markdown: используй списки, жирный текст и цитаты, где уместно.',
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

/** Преобразует историю сообщений и новый вопрос пользователя в нейтральный LlmMessage[]. */
export function buildSentenceChatMessages(input: {
	history: Array<{ role: SentenceChatMessageRole; content: string }>
	newUserQuestion: string
}): LlmMessage[] {
	const messages: LlmMessage[] = []

	for (const message of input.history) {
		if (!message.content) continue

		messages.push({
			role: message.role,
			content: message.content,
		})
	}

	messages.push({
		role: 'user',
		content: input.newUserQuestion,
	})

	return messages
}
