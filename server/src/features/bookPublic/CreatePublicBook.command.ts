import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPublicQueryRepository } from 'repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { Language } from 'utils/languages'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export type CreateBookPublicInput = {
	author: string
	name: string
	note: string
	covers: string[]
	coverBackgroundColor: string
	languageCode: Language
	freeToUse?: boolean
}

export class CreatePublicBookCommand implements ICommand {
	constructor(public createBookInput: CreateBookPublicInput) {}
}

@CommandHandler(CreatePublicBookCommand)
export class CreateBookPublicHandler implements ICommandHandler<CreatePublicBookCommand> {
	constructor(
		private bookPublicRepository: BookPublicRepository,
		private bookPublicQueryRepository: BookPublicQueryRepository,
	) {}

	async execute(command: CreatePublicBookCommand) {
		const { createBookInput } = command

		const newBook = await this.bookPublicRepository.createBookPublic(createBookInput)
		if (!newBook) {
			throw new CustomGraphQLError(errorMessage.book.notCreated, ErrorCode.InternalServerError_500)
		}

		return await this.bookPublicQueryRepository.getPublicBookById(newBook.id)
	}
}
