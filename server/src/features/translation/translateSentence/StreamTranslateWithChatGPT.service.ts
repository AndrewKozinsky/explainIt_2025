import { Injectable } from '@nestjs/common'
import { OpenAIModels } from 'types/openAIModels'
import { Language } from 'utils/languages'
import { OpenAIService } from 'infrastructure/openAI/openAI.service'
import { buildSentenceTranslationPrompt } from './buildSentenceTranslationPrompt'
import { SentenceTranslationProvider } from './SentenceTranslationProvider'

@Injectable()
export class StreamTranslateWithChatGPT implements SentenceTranslationProvider {
	readonly providerName = 'chatgpt' as const

	constructor(private openAIService: OpenAIService) {}

	async translate(input: {
		text: string
		sourceLanguageCode: Language
		targetLanguageCode: Language
		lowPriority?: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		const model = OpenAIModels.Standard

		const messages = this.getChatGPTTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		const response = await this.openAIService.generateText({
			model,
			messages: [
				...messages,
				{
					role: 'user',
					content: input.text,
				},
			],
			reasoningEffort: 'low',
			lowPriority: input.lowPriority,
		})

		return {
			translatedText: response.message ?? '',
			usage: {
				provider: 'chatgpt' as const,
				inputTokens: response.inputTokens,
				outputTokens: response.outputTokens,
				model,
				lowPriority: Boolean(input.lowPriority),
			},
		}
	}

	private getChatGPTTranslationTask(input: {
		sourceLanguageCode: Language
		targetLanguageCode: Language
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
