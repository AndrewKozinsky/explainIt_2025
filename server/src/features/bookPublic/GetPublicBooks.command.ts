import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'

export class GetPublicBooksCommand implements ICommand {
	constructor() {}
}

@CommandHandler(GetPublicBooksCommand)
export class GetBooksPublicHandler implements ICommandHandler<GetPublicBooksCommand> {
	constructor(private bookQueryRepository: BookQueryRepository) {}

	async execute(command: GetPublicBooksCommand) {
		return await this.bookQueryRepository.getPublicBooks()
	}
}
