import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YandexTranslateService } from 'infrastructure/yandexTranslate/yandexTranslate.service'

export type TranslateTextInput = {
	text: string
	targetLanguageCode: string
	sourceLanguageCode?: null | string
}

export type TranslateTextResult = {
	translatedText: string
}

export class TranslateTextCommand implements ICommand {
	constructor(public input: TranslateTextInput) {}
}

@CommandHandler(TranslateTextCommand)
export class TranslateTextHandler implements ICommandHandler<TranslateTextCommand> {
	constructor(private yandexTranslateService: YandexTranslateService) {}

	async execute(command: TranslateTextCommand): Promise<TranslateTextResult> {
		try {
			const result = await this.yandexTranslateService.translateText({
				text: command.input.text,
				targetLanguageCode: command.input.targetLanguageCode,
				sourceLanguageCode: command.input.sourceLanguageCode ?? 'en',
			})

			return {
				translatedText: result.translatedText,
			}
		} catch (error) {
			console.log('Error in TranslateTextHandler => execute')
			console.error(error)

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}
}
