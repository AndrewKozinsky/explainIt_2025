import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { GigaChatService } from '../../infrastructure/gigaChat/gigaChat.service'

type GetTranscriptionInput = {
	engSentence: string
}

type ErrorResult = {
	error: string
}
type SuccessResult = {
	transcription: string
}

export class GetTranscriptionByAiCommand implements ICommand {
	constructor(public GetTranscriptionByAiInput: GetTranscriptionInput) {}
}

@CommandHandler(GetTranscriptionByAiCommand)
export class GetTranscriptionByAiHandler implements ICommandHandler<GetTranscriptionByAiCommand> {
	constructor(private gigaChatService: GigaChatService) {}

	async execute(command: GetTranscriptionByAiCommand): Promise<ErrorResult | SuccessResult> {
		const prompt = this.createPrompt(command.GetTranscriptionByAiInput)

		let transcription = await this.gigaChatService.generateText(prompt)

		// Remove unnecessary slashes
		// /aɪ lʌv ju:/ -> aɪ lʌv ju:
		transcription = transcription.replace(/^\/|\/$/g, '')

		if (!transcription) {
			return {
				error: 'Не удалось сделать запрос. Попробуйте ещё раз.',
			}
		}

		return {
			transcription,
		}
	}

	createPrompt(input: GetTranscriptionInput) {
		const { engSentence } = input

		return `Напиши транскрипцию американского английского для предложения "${engSentence}". Пример ответа: /juː si græs/ или /ðeɪ wɛr suːts/`
	}
}
