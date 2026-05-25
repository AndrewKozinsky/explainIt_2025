import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'repo/bookPrivate.repository'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export type CreateBookInput = {
	author?: null | string
	name?: null | string
	note?: null | string
	languageCode: Language
}

export class CreateBookCommand implements ICommand {
	constructor(
		public userId: number,
		public createBookInput: CreateBookInput,
	) {}
}

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
	constructor(
		private bookRepository: BookPrivateRepository,
		private bookQueryRepository: BookPrivateQueryRepository,
	) {}

	async execute(command: CreateBookCommand) {
		const { userId, createBookInput } = command

		const newBook = await this.bookRepository.createBook({
			userId,
			...createBookInput,
		})
		if (!newBook) {
			throw new CustomError(errorMessage.book.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		return await this.bookQueryRepository.getBookById(newBook.id)
	}
}
