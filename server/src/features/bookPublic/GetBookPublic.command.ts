import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPublicQueryRepository } from 'repo/bookPublic.queryRepository'

export class GetBookPublicCommand implements ICommand {
	constructor(public bookId: number) {}
}

@CommandHandler(GetBookPublicCommand)
export class GetBookPublicHandler implements ICommandHandler<GetBookPublicCommand> {
	constructor(private bookPublicQueryRepository: BookPublicQueryRepository) {}

	async execute(command: GetBookPublicCommand) {
		const { bookId } = command

		return await this.bookPublicQueryRepository.getPublicBookById(bookId)
	}
}
