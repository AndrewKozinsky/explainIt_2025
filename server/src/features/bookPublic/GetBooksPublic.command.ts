import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookPublicQueryRepository } from 'src/repo/bookPublic.queryRepository'

export class GetBooksPublicCommand implements ICommand {
	constructor() {}
}

@CommandHandler(GetBooksPublicCommand)
export class GetBooksPublicHandler implements ICommandHandler<GetBooksPublicCommand> {
	constructor(private bookPublicQueryRepository: BookPublicQueryRepository) {}

	async execute(command: GetBooksPublicCommand) {
		return await this.bookPublicQueryRepository.getPublicBooks()
	}
}
