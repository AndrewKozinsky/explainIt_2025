import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

export type LookupWordInput = {
	text: string
	directionOfTranslation: 'en-ru' // "en-ru" or "ru-en"
	// Язык интерфейса пользователя, на котором будут отображаться названия частей речи в словарной статье.
	// Возможные значения:
	// en - английский;
	// ru - русский;
	// uk - украинский;
	// tr - турецкий.
	ui?: string
}

export type LookupWordResult = YandexDictionaryApiResponse

@Injectable()
export class YandexDictionaryService {
	constructor(private mainConfig: MainConfigService) {}

	async lookupWord(input: LookupWordInput): Promise<LookupWordResult> {
		const key = this.mainConfig.get().yandexCloud.dictionary.key

		try {
			const response = await axios.get<YandexDictionaryApiResponse>(
				'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
				{
					params: {
						key,
						text: input.text,
						lang: input.directionOfTranslation,
						ui: input.ui ?? 'ru',
					},
				},
			)

			return response.data
		} catch (error) {
			console.log('Error in YandexDictionaryService => lookupWord')
			console.error(error)
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}
}

export type YandexDictionaryApiResponse = {
	head: Record<string, unknown>
	def: YandexDictionaryDefinition[]
}

export type YandexDictionaryDefinition = {
	text: string
	pos?: string
	ts?: string
	tr?: YandexDictionaryTranslation[]
}

export type YandexDictionaryTranslation = {
	text: string
	pos?: string
	gen?: string
	syn?: Array<{ text: string; pos?: string; gen?: string }>
	mean?: Array<{ text: string }>
	ex?: Array<{
		text: string
		tr?: Array<{ text: string }>
	}>
}

export interface YandexDictionaryServiceI {
	lookupWord(input: LookupWordInput): Promise<LookupWordResult>
}

@Injectable()
export class YandexDictionaryServiceMock implements YandexDictionaryServiceI {
	async lookupWord(input: LookupWordInput): Promise<LookupWordResult> {
		return {
			head: {},
			def: [
				{
					text: input.text,
					tr: [{ text: input.text }],
				},
			],
		}
	}
}
