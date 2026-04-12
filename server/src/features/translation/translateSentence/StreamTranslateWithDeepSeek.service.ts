import { Injectable } from '@nestjs/common'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { LanguageCode } from 'prisma/generated/enums'
import { buildSentenceTranslationPrompt } from './buildSentenceTranslationPrompt'
import { SentenceTranslationProvider } from './SentenceTranslationProvider'

@Injectable()
export class StreamTranslateWithDeepSeek implements SentenceTranslationProvider {
	readonly providerName = 'deepseek' as const

	constructor(private deepSeekService: DeepSeekService) {}

	async translate(input: {
		text: string
		sourceLanguageCode: LanguageCode
		targetLanguageCode: LanguageCode
		lowPriority?: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		const messages = this.getDeepSeekTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		const response = await this.deepSeekService.generateText({
			messages: [
				...messages,
				{
					role: 'user',
					content: input.text,
				},
			],
			lowPriority: input.lowPriority,
		})

		return {
			translatedText: response.message ?? '',
			usage: {
				provider: 'deepseek' as const,
				inputTokens: response.inputTokens,
				outputTokens: response.outputTokens,
			},
		}
	}

	private getDeepSeekTranslationTask(input: {
		sourceLanguageCode: LanguageCode
		targetLanguageCode: LanguageCode
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		return [
			{
				role: 'system',
				content: buildSentenceTranslationPrompt(input),
			},
		] as const
	}
}
