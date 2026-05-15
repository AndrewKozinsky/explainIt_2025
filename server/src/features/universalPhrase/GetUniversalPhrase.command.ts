import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class GetUniversalPhraseCommand implements ICommand {
	constructor(
		public phrase: string,
		public lang: Language,
	) {}
}

@CommandHandler(GetUniversalPhraseCommand)
export class GetUniversalPhraseHandler implements ICommandHandler<GetUniversalPhraseCommand> {
	constructor(private universalPhraseQueryRepository: UniversalPhraseQueryRepository) {}

	async execute(command: GetUniversalPhraseCommand) {
		const phrase = await this.universalPhraseQueryRepository.getUniversalPhraseByTextAndLang(
			command.phrase,
			command.lang,
		)
		if (!phrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorCode.NotFound_404)
		}

		return phrase
	}
}
