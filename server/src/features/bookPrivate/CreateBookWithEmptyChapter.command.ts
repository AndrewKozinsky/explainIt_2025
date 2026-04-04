import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateOutModel } from 'models/book/book.out.model'
import { LanguageCode } from 'prisma/generated/enums'
import { CreateBookChapterCommand } from '../bookChapter/CreateBookChapter.command'
import { CreateBookCommand } from './CreateBook.command'

type CreateBookInput = {
	author?: null | string
	name?: null | string
	note?: null | string
	languageCode?: null | LanguageCode
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

		const newBook: BookPrivateOutModel = await this.commandBus.execute(
			new CreateBookCommand(userId, createBookInput),
		)
		await this.commandBus.execute(new CreateBookChapterCommand(userId, { bookType: 'private', bookId: newBook.id }))

		return await this.bookQueryRepository.getBookById(newBook.id)
	}
}
