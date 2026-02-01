import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { StreamTranslateWithDeepSeek } from './StreamTranslateWithDeepSeek.service'

export type TranslateSentenceInput = {
	userId: number
	sentenceId: number
	text: string
	sourceLanguageCode?: null | string
	targetLanguageCode?: null | string
}

export type TranslateSentenceResult = {
	translatedText: string
}

export type TranslateSentenceStreamEvent =
	| { type: 'chunk'; text: string }
	| { type: 'done' }
	| { type: 'error'; message: string }

export class TranslateSentenceCommand implements ICommand {
	constructor(public input: TranslateSentenceInput) {}
}

@CommandHandler(TranslateSentenceCommand)
export class TranslateSentenceHandler implements ICommandHandler<TranslateSentenceCommand> {
	constructor(private streamTranslateWithDeepSeek: StreamTranslateWithDeepSeek) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		const events = this.streamTranslate({ ...command.input })
		let translatedText = ''

		for await (const event of events) {
			if (event.type === 'chunk') {
				translatedText += event.text
			}
			if (event.type === 'error') {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		}

		return {
			translatedText,
		}
	}

	async *streamTranslate(
		input: TranslateSentenceInput & { abortSignal?: AbortSignal },
	): AsyncGenerator<TranslateSentenceStreamEvent> {
		try {
			const sourceLanguageCode = input.sourceLanguageCode ?? 'en'
			const targetLanguageCode = input.targetLanguageCode ?? 'ru'

			yield* this.streamTranslateWithDeepSeek.streamTranslate({
				userId: input.userId,
				sentenceId: input.sentenceId,
				text: input.text,
				sourceLanguageCode,
				targetLanguageCode,
				abortSignal: input.abortSignal,
				lowPriority: true,
			})

			return
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => streamTranslate')
			console.error(error)
			yield { type: 'error', message: 'Unknown error' }
		}
	}
}
