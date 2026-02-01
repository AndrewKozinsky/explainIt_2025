import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationQueryRepository } from 'repo/sentenceTranslation.queryRepository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class GetSentenceTranslationsBySentenceIdCommand implements ICommand {
	constructor(
		public userId: number,
		public sentenceId: number,
	) {}
}

@CommandHandler(GetSentenceTranslationsBySentenceIdCommand)
export class GetSentenceTranslationsBySentenceIdHandler
	implements ICommandHandler<GetSentenceTranslationsBySentenceIdCommand>
{
	constructor(
		private sentenceRepository: SentenceRepository,
		private sentenceTranslationQueryRepository: SentenceTranslationQueryRepository,
	) {}

	async execute(command: GetSentenceTranslationsBySentenceIdCommand) {
		const { userId, sentenceId } = command

		const sentenceDb = await this.sentenceRepository.getSentenceDbById(sentenceId)
		if (!sentenceDb) {
			throw new CustomGraphQLError(errorMessage.sentence.notFound, ErrorCode.NotFound_404)
		}

		const isPublicBookChapter = Boolean(sentenceDb.book_chapter?.book_public_id)
		const isOwnerOfPrivateBook = sentenceDb.book_chapter?.book?.user_id === userId
		const isOwnerOfVideo = sentenceDb.video_private?.user_id === userId

		if (!isPublicBookChapter && !isOwnerOfPrivateBook && !isOwnerOfVideo) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		return await this.sentenceTranslationQueryRepository.getSentenceTranslationsBySentenceId(sentenceId)
	}
}
