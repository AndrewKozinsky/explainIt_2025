import { SentenceChatResolver } from './sentenceChat.resolver'

export const sentenceChatResolversDesc: Record<keyof typeof SentenceChatResolver.prototype, string> = {
	getSentenceChatThread:
		'Получить тред чата с ИИ для выделенного предложения со всеми сообщениями. Если тред ещё не создавался — возвращает null.',
	createSentenceChatThread:
		'Создать новый пустой тред чата с ИИ для выделенного предложения. Вызывается клиентом перед отправкой первого вопроса, если getSentenceChatThread вернул null. Если тред уже существует — отдаёт ошибку.',
	createSentenceChatUserMessage:
		'Добавить пользовательское сообщение (вопрос) в существующий тред. После этого клиент подключается к SSE-стриму /sentence-chat/threads/:threadId/assistant-stream, чтобы сервер сгенерировал и постримил ответ ассистента.',
}
