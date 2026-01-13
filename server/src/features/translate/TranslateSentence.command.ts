import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YandexTranslateService } from 'infrastructure/yandexTranslate/yandexTranslate.service'

export type TranslateSentenceInput = {
	sentence: string
	targetLanguageCode?: null | string
	sourceLanguageCode?: null | string
}

export type TranslateSentenceResult = {
	translatedText: string
}

export class TranslateSentenceCommand implements ICommand {
	constructor(public input: TranslateSentenceInput) {}
}

@CommandHandler(TranslateSentenceCommand)
export class TranslateSentenceHandler implements ICommandHandler<TranslateSentenceCommand> {
	constructor(private yandexTranslateService: YandexTranslateService) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		const { input } = command

		try {
			const result = await this.yandexTranslateService.translateText({
				text: input.sentence,
				targetLanguageCode: input.targetLanguageCode ?? 'ru',
				sourceLanguageCode: input.sourceLanguageCode ?? 'en',
			})

			return {
				translatedText: result.translatedText,
			}
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => execute')
			console.error(error)

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}
}
