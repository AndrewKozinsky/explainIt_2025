import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { GigaChatService } from 'infrastructure/gigaChat/gigaChat.service'
import { TelegramService } from 'infrastructure/telegram/telegram.service'

type AnalysePhaseInSentenceByAiInput = {
	bookAuthor: null | string
	bookName: null | string
	context: string
	sentence: string
	phrase: string
}

export class AnalysePhaseInSentenceByAiCommand implements ICommand {
	constructor(public checkTranslationByAiInput: AnalysePhaseInSentenceByAiInput) {}
}

@CommandHandler(AnalysePhaseInSentenceByAiCommand)
export class AnalysePhaseInSentenceByAiHandler implements ICommandHandler<AnalysePhaseInSentenceByAiCommand> {
	constructor(
		private gigaChatService: GigaChatService,
		private telegramService: TelegramService,
	) {}

	async execute(command: AnalysePhaseInSentenceByAiCommand) {
		return {
			id: 1,
			sentenceTranslation: 'sentenceTranslation',
		}
	}
}
