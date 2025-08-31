import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'src/repo/book.queryRepository'

export class GetUserBooksCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(GetUserBooksCommand)
export class GetUserBooksHandler implements ICommandHandler<GetUserBooksCommand> {
	constructor(private bookQueryRepository: BookQueryRepository) {}

	async execute(command: GetUserBooksCommand) {
		const { userId } = command

		return await this.bookQueryRepository.getUserBooks(userId)
	}
}
