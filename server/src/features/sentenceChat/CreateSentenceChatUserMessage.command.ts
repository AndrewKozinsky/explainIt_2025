import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceChatMessageRepository } from 'repo/sentenceChatMessage.repository'
import { SentenceChatThreadQueryRepository } from 'repo/sentenceChatThread.queryRepository'
import { SentenceChatThreadRepository } from 'repo/sentenceChatThread.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SentenceChatMessageOutModel } from 'models/sentenceChat/sentenceChatMessage.out.model'

export class CreateSentenceChatUserMessageCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			threadId: number
			question: string
		},
	) {}
}

@CommandHandler(CreateSentenceChatUserMessageCommand)
export class CreateSentenceChatUserMessageHandler implements ICommandHandler<
	CreateSentenceChatUserMessageCommand,
	SentenceChatMessageOutModel
> {
	constructor(
		private sentenceChatThreadRepository: SentenceChatThreadRepository,
		private sentenceChatMessageRepository: SentenceChatMessageRepository,
		private sentenceChatThreadQueryRepository: SentenceChatThreadQueryRepository,
	) {}

	async execute(command: CreateSentenceChatUserMessageCommand): Promise<SentenceChatMessageOutModel> {
		const { userId, threadId, question } = command.dto

		const trimmedQuestion = question.trim()
		if (!trimmedQuestion) {
			throw new CustomError(errorMessage.sentenceChat.questionIsEmpty, ErrorStatusCode.BadRequest_400)
		}

		const thread = await this.sentenceChatThreadRepository.getThreadById(threadId)
		if (!thread) {
			throw new CustomError(errorMessage.sentenceChat.threadNotFound, ErrorStatusCode.NotFound_404)
		}
		if (thread.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		// Проверяем, что предыдущий ответ уже завершён: последнее сообщение либо отсутствует,
		// либо это assistant с финальным статусом. Не даём задать новый вопрос, пока предыдущий
		// ответ ещё stream-ится / висит без ответа.
		const lastMessage = await this.sentenceChatMessageRepository.getLastMessageInThread(threadId)
		if (lastMessage && (lastMessage.role !== 'assistant' || lastMessage.status === 'streaming')) {
			throw new CustomError(errorMessage.sentenceChat.previousAnswerNotReady, ErrorStatusCode.BadRequest_400)
		}

		const userMessage = await this.sentenceChatMessageRepository.createMessage({
			threadId,
			role: 'user',
			content: trimmedQuestion,
			status: 'completed',
		})

		await this.sentenceChatThreadRepository.touchThread(threadId)

		const userMessageOut = await this.sentenceChatThreadQueryRepository.getMessageById(userMessage.id)
		if (!userMessageOut) {
			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
		return userMessageOut
	}
}
