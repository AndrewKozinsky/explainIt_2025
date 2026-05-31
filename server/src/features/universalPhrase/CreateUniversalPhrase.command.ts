import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LanguageCode } from 'prisma/generated/client'

type CreateUniversalPhraseInput = {
	text: string
	sourceLanguageCode: LanguageCode
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

		const existingPhrase = await this.universalPhraseQueryRepository.getUniversalPhraseByTextAndLang(
			createPhraseInput.text,
			createPhraseInput.sourceLanguageCode,
		)
		if (existingPhrase) {
			throw new CustomError(errorMessage.universalPhrase.alreadyExists, ErrorStatusCode.BadRequest_400)
		}

		const newPhrase = await this.universalPhraseRepository.createUniversalPhrase(createPhraseInput)
		if (!newPhrase) {
			throw new CustomError(errorMessage.universalPhrase.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		return await this.universalPhraseQueryRepository.getUniversalPhraseById(newPhrase.id)
	}
}
