// import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
// import { EngRusDictionaryRepository } from 'repo/engRusDictionary.repository'
// import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
// import { ErrorCode } from 'infrastructure/exceptions/errorCode'
// import { errorMessage } from 'infrastructure/exceptions/errorMessage'
// import { YandexDictionaryService } from 'infrastructure/yandexDictionary/yandexDictionary.service'
// import { YandexTranslateService } from 'infrastructure/yandexTranslate/yandexTranslate.service'
// import { EngRusDictionaryItemOutModel } from 'models/dictionary/dictionary.out.model'

/*export type TranslateTextInput = {
	text: string
	targetLanguageCode?: null | string
	sourceLanguageCode?: null | string
}*/

/*export class TranslatePhraseCommand implements ICommand {
	constructor(public input: TranslateTextInput) {}
}*/

/*@CommandHandler(TranslatePhraseCommand)
export class TranslatePhraseHandler implements ICommandHandler<TranslatePhraseCommand> {
	constructor(
		private yandexTranslateService: YandexTranslateService,
		private yandexDictionaryService: YandexDictionaryService,
		private engRusDictionaryRepository: EngRusDictionaryRepository,
	) {}

	async execute(command: TranslatePhraseCommand): Promise<EngRusDictionaryItemOutModel> {
		const { input } = command

		// 1. This command gets a word or several words in English.
		// 2. The program checks existing of these words in the EngRusDictionary table in the database.
		const dictionaryItem = await this.engRusDictionaryRepository.getDictionaryItemByEngPhrase(input.text)

		// 3. If these words exist in the EngRusDictionary table, it returns full data.
		if (dictionaryItem) {
			return dictionaryItem
		}

		// 4. If these words don't exist in the EngRusDictionary table, the program must do a request to Yandex Translate service and to get a translation.
		const yandexTranslateResponse = await this.yandexTranslateService.translateText({
			text: input.text,
			targetLanguageCode: 'ru',
			sourceLanguageCode: 'en',
		})

		// Get transcription
		const transcription = await this.getTranscription(input.text)
		// Get lexemes
		const lexemes = await this.getPhraseLexemes(input.text)

		// Save all data to the database
		const createdPhrase = await this.engRusDictionaryRepository.saveDictionaryItem({
			engPhrase: input.text,
			rusPhrase: yandexTranslateResponse.translatedText,
			transcription,
			lexemes,
		})
		if (!createdPhrase) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return createdPhrase
	}

	async getTranscription(phrase: string) {
		const words = phrase.trim().split(/\s+/).filter(Boolean)
		if (words.length === 0) return ''

		const transcriptions = await Promise.all(
			words.map(async (word) => {
				try {
					const dictionaryItem = await this.engRusDictionaryRepository.getDictionaryItemByEngPhrase(word)
					if (dictionaryItem) {
						return dictionaryItem.transcription ?? word
					}

					const response = await this.yandexDictionaryService.lookupWord({
						text: word,
						directionOfTranslation: 'en-ru',
						ui: 'ru',
					})
					const transcription = response.def?.[0]?.ts
					return transcription ?? word
				} catch {
					return word
				}
			}),
		)

		return transcriptions.join(' ')
	}

	async getPhraseLexemes(phrase: string) {
		const lexemes = await this.yandexDictionaryService.lookupWord({ text: phrase })
		if (!lexemes || !lexemes.def || !lexemes.def.length) {
			return null
		}

		return JSON.stringify(lexemes.def)
	}
}*/
