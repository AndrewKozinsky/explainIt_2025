import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

export type TranslateTextInput = {
	text: string
	targetLanguageCode: string
	sourceLanguageCode?: string
	folderId?: string
}

export type TranslateTextResult = {
	translatedText: string
}

@Injectable()
export class YandexTranslateService {
	constructor(private mainConfig: MainConfigService) {}

	async translateText(input: TranslateTextInput): Promise<TranslateTextResult> {
		if (this.mainConfig.get().mode === 'localtest') {
			return {
				translatedText: input.text,
			}
		}

		const accessKeyId = this.mainConfig.get().yandexCloud.s3.keyId
		const secretAccessKey = this.mainConfig.get().yandexCloud.s3.secretKey

		try {
			const response = await axios.post<YandexTranslateApiResponse>(
				'https://translate.api.cloud.yandex.net/translate/v2/translate',
				{
					texts: [input.text],
					targetLanguageCode: input.targetLanguageCode,
					sourceLanguageCode: input.sourceLanguageCode,
					folderId: input.folderId,
				},
				{
					headers: {
						Authorization: `Api-Key ${accessKeyId}`,
						'Content-Type': 'application/json',
					},
				},
			)

			const translatedText = response.data.translations?.[0]?.text
			if (!translatedText) {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}

			return {
				translatedText,
			}
		} catch (error) {
			console.log('Error in YandexTranslateService => translateText')
			console.error(error)
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}
}

type YandexTranslateApiResponse = {
	translations: Array<{
		text: string
		detectedLanguageCode?: string
	}>
}

export interface YandexTranslateServiceI {
	translateText(input: TranslateTextInput): Promise<TranslateTextResult>
}

@Injectable()
export class YandexTranslateServiceMock implements YandexTranslateServiceI {
	async translateText(input: TranslateTextInput): Promise<TranslateTextResult> {
		return {
			translatedText: input.text,
		}
	}
}
