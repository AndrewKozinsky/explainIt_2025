import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceChatThreadQueryRepository } from 'repo/sentenceChatThread.queryRepository'
import { SentenceChatThreadRepository } from 'repo/sentenceChatThread.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SentenceChatThreadOutModel } from 'models/sentenceChat/sentenceChatThread.out.model'

export class CreateSentenceChatThreadCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			sentenceId: number
		},
	) {}
}

@CommandHandler(CreateSentenceChatThreadCommand)
export class CreateSentenceChatThreadHandler implements ICommandHandler<
	CreateSentenceChatThreadCommand,
	SentenceChatThreadOutModel
> {
	constructor(
		private sentenceRepository: SentenceRepository,
		private sentenceChatThreadRepository: SentenceChatThreadRepository,
		private sentenceChatThreadQueryRepository: SentenceChatThreadQueryRepository,
	) {}

	async execute(command: CreateSentenceChatThreadCommand): Promise<SentenceChatThreadOutModel> {
		const { userId, sentenceId } = command.dto

		const sentence = await this.sentenceRepository.getSentenceDbById(sentenceId)
		if (!sentence) {
			throw new CustomGraphQLError(errorMessage.sentence.notFound, ErrorCode.NotFound_404)
		}

		const existing = await this.sentenceChatThreadRepository.getThreadByUserAndSentence({
			userId,
			sentenceId,
		})
		if (existing) {
			throw new CustomGraphQLError(errorMessage.sentenceChat.threadAlreadyExists, ErrorCode.BadRequest_400)
		}

		const thread = await this.sentenceChatThreadRepository.createThread({ userId, sentenceId })

		const threadOut = await this.sentenceChatThreadQueryRepository.getThreadById(thread.id)
		if (!threadOut) {
			throw new CustomGraphQLError(errorMessage.sentenceChat.threadNotFound, ErrorCode.InternalServerError_500)
		}
		return threadOut
	}
}
