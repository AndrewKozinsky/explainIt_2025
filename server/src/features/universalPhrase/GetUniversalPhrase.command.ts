import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export class GetUniversalPhraseCommand implements ICommand {
	constructor(
		public text: string,
		public sourceLanguageCode: Language,
	) {}
}

@CommandHandler(GetUniversalPhraseCommand)
export class GetUniversalPhraseHandler implements ICommandHandler<GetUniversalPhraseCommand> {
	constructor(private universalPhraseQueryRepository: UniversalPhraseQueryRepository) {}

	async execute(command: GetUniversalPhraseCommand) {
		const phrase = await this.universalPhraseQueryRepository.getUniversalPhraseByTextAndLang(
			command.text,
			command.sourceLanguageCode,
		)
		if (!phrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
		}

		return phrase
	}
}
