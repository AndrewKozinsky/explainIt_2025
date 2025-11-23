import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookPublicQueryRepository } from 'src/repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'

export type CreateBookPublicInput = {
	author: string
	name: string
	note: string
	cover: string
}

export class CreateBookPublicCommand implements ICommand {
	constructor(public createBookInput: CreateBookPublicInput) {}
}

@CommandHandler(CreateBookPublicCommand)
export class CreateBookPublicHandler implements ICommandHandler<CreateBookPublicCommand> {
	constructor(
		private bookPublicRepository: BookPublicRepository,
		private bookPublicQueryRepository: BookPublicQueryRepository,
	) {}

	async execute(command: CreateBookPublicCommand) {
		const { createBookInput } = command

		const newBook = await this.bookPublicRepository.createBookPublic(createBookInput)
		if (!newBook) {
			throw new CustomGraphQLError(errorMessage.book.notCreated, ErrorCode.InternalServerError_500)
		}

		return await this.bookPublicQueryRepository.getPublicBookById(newBook.id)
	}
}
