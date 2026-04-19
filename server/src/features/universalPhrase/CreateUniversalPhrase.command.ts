import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { LanguageCode } from 'prisma/generated/client'

type CreateUniversalPhraseInput = {
	phrase: string
	languageCode: LanguageCode
}

export class CreateUniversalPhraseCommand implements ICommand {
	constructor(public createPhraseInput: CreateUniversalPhraseInput) {}
}

@CommandHandler(CreateUniversalPhraseCommand)
export class CreateUniversalPhraseHandler implements ICommandHandler<CreateUniversalPhraseCommand> {
	constructor(
		private universalPhraseRepository: UniversalPhraseRepository,
		private universalPhraseQueryRepository: UniversalPhraseQueryRepository,
	) {}

	async execute(command: CreateUniversalPhraseCommand) {
		const { createPhraseInput } = command

		const newPhrase = await this.universalPhraseRepository.createUniversalPhrase(createPhraseInput)
		if (!newPhrase) {
			throw new CustomGraphQLError(errorMessage.universalPhrase.notCreated, ErrorCode.InternalServerError_500)
		}

		return await this.universalPhraseQueryRepository.getUniversalPhraseById(newPhrase.id)
	}
}
