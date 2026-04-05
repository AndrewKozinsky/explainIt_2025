import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { WordQueryRepository } from 'repo/word.queryRepository'
import { WordRepository } from 'repo/word.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { LanguageCode } from 'prisma/generated/client'

type CreateWordInput = {
	word: string
	languageCode: LanguageCode
}

export class CreateWordCommand implements ICommand {
	constructor(public createWordInput: CreateWordInput) {}
}

@CommandHandler(CreateWordCommand)
export class CreateWordHandler implements ICommandHandler<CreateWordCommand> {
	constructor(
		private wordRepository: WordRepository,
		private wordQueryRepository: WordQueryRepository,
	) {}

	async execute(command: CreateWordCommand) {
		const { createWordInput } = command

		const newWord = await this.wordRepository.createWord(createWordInput)
		if (!newWord) {
			throw new CustomGraphQLError(errorMessage.word.notCreated, ErrorCode.InternalServerError_500)
		}

		return await this.wordQueryRepository.getWordById(newWord.id)
	}
}
