import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookPrivateQueryRepository } from 'src/repo/bookPrivate.queryRepository'

export class GetBookCommand implements ICommand {
	constructor(
		public userId: number,
		public bookId: number,
	) {}
}

@CommandHandler(GetBookCommand)
export class GetBookHandler implements ICommandHandler<GetBookCommand> {
	constructor(private bookQueryRepository: BookPrivateQueryRepository) {}

	async execute(command: GetBookCommand) {
		const { userId, bookId } = command

		// Check if the book exists
		const book = await this.bookQueryRepository.getBookById(bookId)
		if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}

		// Throw an error if this user is not the owner of the book
		if (book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		return book
	}
}
