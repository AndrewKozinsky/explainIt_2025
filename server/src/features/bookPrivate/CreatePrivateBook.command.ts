import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { BookRepository } from 'repo/book/book.repository'
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

export class CreatePrivateBookCommand implements ICommand {
	constructor(
		public userId: number,
		public createBookInput: CreateBookInput,
	) {}
}

@CommandHandler(CreatePrivateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreatePrivateBookCommand> {
	constructor(
		private bookRepository: BookRepository,
		private bookQueryRepository: BookQueryRepository,
	) {}

	async execute(command: CreatePrivateBookCommand) {
		const { userId, createBookInput } = command

		const newBook = await this.bookRepository.createBook({
			type: 'private' as const,
			userId,
			...createBookInput,
		})
		if (!newBook) {
			throw new CustomError(errorMessage.book.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		return await this.bookQueryRepository.getBookById(newBook.id)
	}
}
