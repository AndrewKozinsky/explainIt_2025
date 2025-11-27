import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookPrivateQueryRepository } from 'src/repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'src/repo/bookPrivate.repository'

type DeleteBookInput = {
	id: number
}

export class DeleteBookCommand implements ICommand {
	constructor(
		public userId: number,
		public deleteBookInput: DeleteBookInput,
	) {}
}

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
	constructor(
		private bookRepository: BookPrivateRepository,
		private bookQueryRepository: BookPrivateQueryRepository,
	) {}

	async execute(command: DeleteBookCommand) {
		const { userId, deleteBookInput } = command

		// Check if the book exists
		const book = await this.bookQueryRepository.getBookById(deleteBookInput.id)
		if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}

		// Throw an error if this user is not the owner of the book
		if (book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		await this.bookRepository.deleteBookById(deleteBookInput.id)

		return true
	}
}
