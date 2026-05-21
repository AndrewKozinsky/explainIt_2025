import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceChatThreadQueryRepository } from 'repo/sentenceChatThread.queryRepository'
import { SentenceChatThreadRepository } from 'repo/sentenceChatThread.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
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
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		const existing = await this.sentenceChatThreadRepository.getThreadByUserAndSentence({
			userId,
			sentenceId,
		})
		if (existing) {
			throw new CustomError(errorMessage.sentenceChat.threadAlreadyExists, ErrorStatusCode.BadRequest_400)
		}

		const thread = await this.sentenceChatThreadRepository.createThread({ userId, sentenceId })

		const threadOut = await this.sentenceChatThreadQueryRepository.getThreadById(thread.id)
		if (!threadOut) {
			throw new CustomError(errorMessage.sentenceChat.threadNotFound, ErrorStatusCode.InternalServerError_500)
		}
		return threadOut
	}
}
