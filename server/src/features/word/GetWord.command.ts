import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { WordQueryRepository } from 'repo/word.queryRepository'
import { Language } from 'utils/languages'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class GetWordCommand implements ICommand {
	constructor(
		public word: string,
		public lang: Language,
	) {}
}

@CommandHandler(GetWordCommand)
export class GetWordHandler implements ICommandHandler<GetWordCommand> {
	constructor(private wordQueryRepository: WordQueryRepository) {}

	async execute(command: GetWordCommand) {
		const word = await this.wordQueryRepository.getWordByTextAndLang(command.word, command.lang)
		if (!word) {
			throw new CustomGraphQLError(errorMessage.word.notFound, ErrorCode.NotFound_404)
		}

		return word
	}
}
