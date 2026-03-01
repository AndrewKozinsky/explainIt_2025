import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceTranslationQueryRepository } from 'repo/sentenceTranslation.queryRepository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class GetSentenceTranslationCommand implements ICommand {
	constructor(
		public userId: number,
		public sentenceTranslationId: number,
	) {}
}

@CommandHandler(GetSentenceTranslationCommand)
export class GetSentenceTranslationHandler implements ICommandHandler<GetSentenceTranslationCommand> {
	constructor(
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private sentenceTranslationQueryRepository: SentenceTranslationQueryRepository,
	) {}

	async execute(command: GetSentenceTranslationCommand) {
		const { userId, sentenceTranslationId } = command

		const sentenceTranslationDb =
			await this.sentenceTranslationRepository.getSentenceTranslationDbById(sentenceTranslationId)

		if (!sentenceTranslationDb) {
			throw new CustomGraphQLError(errorMessage.sentenceTranslation.notFound, ErrorCode.NotFound_404)
		}

		const sentence = sentenceTranslationDb.sentence

		// Все эти проверки может даже можно убрать позже...
		const isPublicBookChapter = Boolean(sentence.bookChapter?.book_public_id)
		const isOwnerOfPrivateBook = sentence.bookChapter?.book?.user_id === userId
		const isOwnerOfVideo = sentence.videoPrivate?.user_id === userId

		if (!isPublicBookChapter && !isOwnerOfPrivateBook && !isOwnerOfVideo) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		return this.sentenceTranslationQueryRepository.getSentenceTranslationById(sentenceTranslationId)
	}
}
