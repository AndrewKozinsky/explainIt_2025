import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookOutModel } from 'models/book/book.out.model'
import { BookPrivateQueryRepository } from 'src/repo/bookPrivate.queryRepository'
import { CreateBookChapterCommand } from '../bookChapter/CreateBookChapter.command'
import { CreateBookCommand } from './CreateBook.command'

type CreateBookInput = {
	author?: null | string
	name?: null | string
	note?: null | string
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
		private bookQueryRepository: BookPrivateQueryRepository,
	) {}

	async execute(command: CreateBookWithEmptyChapterCommand) {
		const { userId, createBookInput } = command

		const newBook: BookOutModel = await this.commandBus.execute(new CreateBookCommand(userId, createBookInput))
		await this.commandBus.execute(new CreateBookChapterCommand(userId, { bookType: 'private', bookId: newBook.id }))

		return await this.bookQueryRepository.getBookById(newBook.id)
	}
}
