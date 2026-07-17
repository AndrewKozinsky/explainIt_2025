// import { Injectable } from '@nestjs/common'
// import axios from 'axios'
// import { CustomError } from 'infrastructure/exceptions/customErrors'
// import { errorMessage } from 'infrastructure/exceptions/errorMessage'
// import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
// import { MainConfigService } from '../mainConfig/mainConfig.service'

/*export type TranslateTextInput = {
	text: string
	sourceLanguageCode?: string
}*/

/*export type TranslateTextResult = {
	translatedText: string
}*/

/*@Injectable()
export class YandexTranslateService {
	constructor(private mainConfig: MainConfigService) {}

	async translateText(inputs: TranslateTextInput): Promise<TranslateTextResult> {
		const secretKey = this.mainConfig.get().yandexCloud.translate.secretKey
		const folderId = this.mainConfig.get().yandexCloud.translate.folderId

		try {
			const response = await axios.post<YandexTranslateApiResponse>(
				'https://translate.api.cloud.yandex.net/translate/v2/translate',
				{
					texts: [inputs.text],
					sourceLanguageCode: inputs.sourceLanguageCode,
					folderId,
				},
				{
					headers: {
						Authorization: `Api-Key ${secretKey}`,
						'Content-Type': 'application/json',
					},
				},
			)

			const translatedText = response.data.translations?.[0]?.text
			if (!translatedText) {
				throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
			}

			return {
				translatedText,
			}
		} catch (error) {
			console.log('Error in YandexTranslateService => translateText')
			console.error(error)
			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
	}
}*/

/*type YandexTranslateApiResponse = {
	translations: Array<{
		text: string
		detectedLanguageCode?: string
	}>
}*/

/*export interface YandexTranslateServiceI {
	translateText(inputs: TranslateTextInput): Promise<TranslateTextResult>
}*/

/*@Injectable()
export class YandexTranslateServiceMock implements YandexTranslateServiceI {
	async translateText(inputs: TranslateTextInput): Promise<TranslateTextResult> {
		return {
			translatedText: inputs.text,
		}
	}
}*/
