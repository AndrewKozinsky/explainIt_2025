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

		// 1. This command gets a word or several words in the text property.
		// 2. The program checks existing of these words in the EnglishRussianDictionary table in the database.
		// 3. If these words exist in the EnglishRussianDictionary table, it returns full data.
		// 4. If these words don't exist in the EnglishRussianDictionary table, the program must do a request to Yandex Dictionary service and to get a translation.
		// 5. After the Yandex Dictionary service returns correct data, I have to remain it in the EnglishRussianDictionary table.
		// 6. Then I have to get transcriptions for all words. To do this, I have to call the YandexDictionaryService and pass my words there.
		// 7. If YandexDictionaryService returns a successful answer, I put this data in EnglishRussianDictionary table, then I return full data.
		// 8. If YandexDictionaryService returns an unsuccessful answer, I divide text, then I check if this word exists in EnglishRussianDictionary table.
		// 9. If it doesn't exist, I do a request to Yandex Dictionary service to get full analysis.
		// 10. Then I save the full analysis in EnglishRussianDictionary table.
		// 11. In the end, I collect a translation, transcription and data from the dictionary to full answer and return in to the client.

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
