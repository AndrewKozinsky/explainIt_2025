import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'repo/bookPrivate.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

type UpdateBookInput = {
	id: number
	author?: null | string
	name?: null | string
	languageCode?: null | Language
	note?: null | string
}

export class UpdateBookCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookInput: UpdateBookInput,
	) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
	constructor(
		private bookRepository: BookPrivateRepository,
		private bookQueryRepository: BookPrivateQueryRepository,
	) {}

	async execute(command: UpdateBookCommand) {
		const { userId, updateBookInput } = command

		// Check if the book exists
		const bookForUpdating = await this.bookQueryRepository.getBookById(updateBookInput.id)
		if (!bookForUpdating) {
			throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
		}

		// Throw an error if this user is not the owner of the book
		if (bookForUpdating.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const book = await this.bookRepository.updateBookById(updateBookInput.id, updateBookInput)
		if (!book) {
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}

		return this.bookQueryRepository.getBookById(book.id)
	}
}
