import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { Language } from 'utils/languages'
import { normalizePhraseString } from 'utils/stringUtils'

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
		const normalizedText = normalizePhraseString(command.text)

		return await this.universalPhraseQueryRepository.getUniversalPhraseByTextAndLang(
			normalizedText,
			command.sourceLanguageCode,
		)
	}
}
