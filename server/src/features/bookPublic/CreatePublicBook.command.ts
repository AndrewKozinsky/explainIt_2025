import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { BookRepository } from 'repo/book/book.repository'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export type CreateBookPublicInput = {
	author?: string
	name: string
	note: string
	coverFileName: string
	coverFileS3Key: string
	languageCode: Language
}

export class CreatePublicBookCommand implements ICommand {
	constructor(public createBookInput: CreateBookPublicInput) {}
}

@CommandHandler(CreatePublicBookCommand)
export class CreateBookPublicHandler implements ICommandHandler<CreatePublicBookCommand> {
	constructor(
		private bookRepository: BookRepository,
		private bookQueryRepository: BookQueryRepository,
	) {}

	async execute(command: CreatePublicBookCommand) {
		const { createBookInput } = command

		const newBook = await this.bookRepository.createBook({ type: 'public', ...createBookInput })
		if (!newBook) {
			throw new CustomError(errorMessage.book.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		return await this.bookQueryRepository.getBookById(newBook.id)
	}
}
