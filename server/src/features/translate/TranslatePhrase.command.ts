import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YandexDictionaryService } from 'infrastructure/yandexDictionary/yandexDictionary.service'
import { YandexTranslateService } from 'infrastructure/yandexTranslate/yandexTranslate.service'

export type TranslateTextInput = {
	text: string
	targetLanguageCode?: null | string
	sourceLanguageCode?: null | string
}

export type TranslateTextResult = {
	translatedText: string
}

export class TranslatePhraseCommand implements ICommand {
	constructor(public input: TranslateTextInput) {}
}

@CommandHandler(TranslatePhraseCommand)
export class TranslatePhraseHandler implements ICommandHandler<TranslatePhraseCommand> {
	constructor(
		private yandexTranslateService: YandexTranslateService,
		private yandexDictionaryService: YandexDictionaryService,
	) {}

	async execute(command: TranslatePhraseCommand): Promise<TranslateTextResult> {
		const { input } = command

		try {
			// Transform this code late to get a transcription and dictionary words if it possible
			/*const res = await this.yandexDictionaryService.lookupWord({
				// text: input.text,
				text: 'quite a lot',
				directionOfTranslation: 'en-ru',
			})
			console.log(JSON.stringify(res))*/

			const result = await this.yandexTranslateService.translateText({
				text: input.text,
				targetLanguageCode: input.targetLanguageCode ?? 'ru',
				sourceLanguageCode: input.sourceLanguageCode ?? 'en',
			})

			return {
				translatedText: result.translatedText,
			}
		} catch (error) {
			console.log('Error in TranslatePhraseHandler => execute')
			console.error(error)

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}
}

const dd = {
	head: {},
	def: [
		{
			text: 'savings',
			pos: 'существительное',
			ts: 'ˈseɪvɪŋz',
			tr: [
				{ text: 'сбережения', pos: 'существительное', gen: 'ср', fr: 1, mean: [{ text: 'saving' }] },
				{ text: 'экономия средств', pos: 'существительное', fr: 10, mean: [{ text: 'cost savings' }] },
				{ text: 'сбережение населения', pos: 'существительное', fr: 5 },
				{ text: 'сберкасса', pos: 'существительное', gen: 'ж', fr: 5, mean: [{ text: 'savings bank' }] },
			],
		},
		{
			text: 'savings',
			pos: 'прилагательное',
			ts: 'ˈseɪvɪŋz',
			tr: [{ text: 'сберегательный', pos: 'прилагательное', fr: 10, mean: [{ text: 'saving' }] }],
		},
	],
	nmt_code: 200,
	code: 200,
}
