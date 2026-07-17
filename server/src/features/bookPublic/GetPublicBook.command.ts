import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'

export class GetPublicBookCommand implements ICommand {
	constructor(public bookId: number) {}
}

@CommandHandler(GetPublicBookCommand)
export class GetBookPublicHandler implements ICommandHandler<GetPublicBookCommand> {
	constructor(private bookQueryRepository: BookQueryRepository) {}

	async execute(command: GetPublicBookCommand) {
		const { bookId } = command

		return await this.bookQueryRepository.getBookById(bookId)
	}
}
