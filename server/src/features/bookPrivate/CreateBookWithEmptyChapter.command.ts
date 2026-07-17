import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { Language } from 'utils/languages'
import { BookOutModel } from 'models/book/book.out.model'
import { CreateBookChapterCommand } from '../bookChapter/CreateBookChapter.command'
import { CreatePrivateBookCommand } from './CreatePrivateBook.command'

type CreateBookInput = {
	author?: null | string
	name?: null | string
	note?: null | string
	languageCode: Language
}

export class CreateBookWithEmptyChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public createBookInput: CreateBookInput,
	) {}
}

@CommandHandler(CreateBookWithEmptyChapterCommand)
export class CreateBookWithEmptyChapterHandler implements ICommandHandler<CreateBookWithEmptyChapterCommand> {
	constructor(
		private commandBus: CommandBus,
		private bookQueryRepository: BookQueryRepository,
	) {}

	async execute(command: CreateBookWithEmptyChapterCommand) {
		const { userId, createBookInput } = command

		const newBook: BookOutModel = await this.commandBus.execute(
			new CreatePrivateBookCommand(userId, createBookInput),
		)
		await this.commandBus.execute(new CreateBookChapterCommand(userId, { bookId: newBook.id }))

		return await this.bookQueryRepository.getBookById(newBook.id)
	}
}
