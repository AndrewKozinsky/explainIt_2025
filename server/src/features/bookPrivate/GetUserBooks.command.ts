import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'

export class GetUserBooksCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(GetUserBooksCommand)
export class GetUserBooksHandler implements ICommandHandler<GetUserBooksCommand> {
	constructor(private bookQueryRepository: BookPrivateQueryRepository) {}

	async execute(command: GetUserBooksCommand) {
		const { userId } = command

		return await this.bookQueryRepository.getUserBooks(userId)
	}
}
