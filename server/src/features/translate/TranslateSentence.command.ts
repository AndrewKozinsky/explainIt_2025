import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { StreamTranslateWithChatGPT } from 'features/translate/StreamTranslateWithChatGPT.service'
import { StreamTranslateWithYandex } from 'features/translate/StreamTranslateWithYandex.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SentenceTranslationProvider } from 'prisma/generated/client'

export type TranslateSentenceInput = {
	sentenceId: number
	provider: SentenceTranslationProvider
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
	constructor(
		private streamTranslateWithYandex: StreamTranslateWithYandex,
		private streamTranslateWithChatGPT: StreamTranslateWithChatGPT,
	) {}

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

			if (input.provider === 'yandexTranslate') {
				yield* this.streamTranslateWithYandex.streamTranslate({
					sentenceId: input.sentenceId,
					provider: input.provider,
					text: input.text,
					sourceLanguageCode,
					targetLanguageCode,
				})

				return
			}

			if (input.provider.startsWith('chatGPT')) {
				yield* this.streamTranslateWithChatGPT.streamTranslate({
					sentenceId: input.sentenceId,
					provider: input.provider,
					text: input.text,
					sourceLanguageCode,
					targetLanguageCode,
					abortSignal: input.abortSignal,
				})

				return
			}

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => streamTranslate')
			console.error(error)
			yield { type: 'error', message: 'Unknown error' }
		}
	}
}
