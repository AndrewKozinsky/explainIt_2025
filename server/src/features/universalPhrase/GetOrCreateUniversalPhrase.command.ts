import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { LanguageCode } from 'prisma/generated/client'

type CreateUniversalPhraseInput = {
	text: string
	sourceLanguageCode: LanguageCode
}

export class GetOrCreateUniversalPhraseCommand implements ICommand {
	constructor(public createPhraseInput: CreateUniversalPhraseInput) {}
}

@CommandHandler(GetOrCreateUniversalPhraseCommand)
export class CreateUniversalPhraseHandler implements ICommandHandler<GetOrCreateUniversalPhraseCommand> {
	constructor(
		private universalPhraseRepository: UniversalPhraseRepository,
		private universalPhraseQueryRepository: UniversalPhraseQueryRepository,
	) {}

	async execute(command: GetOrCreateUniversalPhraseCommand) {
		const { createPhraseInput } = command

		// Атомарный find-or-create (upsert) — нет окна для гонки между проверкой и вставкой.
		// Команда идемпотентна: если фраза уже существует, возвращает её вместо ошибки.
		const phrase = await this.universalPhraseRepository.findOrCreate({
			sentenceText: createPhraseInput.text,
			sourceLanguage: createPhraseInput.sourceLanguageCode,
		})

		return await this.universalPhraseQueryRepository.getUniversalPhraseById(phrase.id)
	}
}
