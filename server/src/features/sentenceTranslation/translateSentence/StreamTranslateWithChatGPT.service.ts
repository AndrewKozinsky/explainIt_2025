import { Injectable } from '@nestjs/common'
import { OpenAIModels } from 'types/openAIModels'
import { OpenAIService } from 'infrastructure/openAI/openAI.service'
import { buildSentenceTranslationPrompt } from './buildSentenceTranslationPrompt'
import { SentenceTranslationProvider, SentenceTranslationProviderStreamEvent } from './SentenceTranslationProvider'

@Injectable()
export class StreamTranslateWithChatGPT implements SentenceTranslationProvider {
	readonly providerName = 'chatgpt' as const

	constructor(private openAIService: OpenAIService) {}

	async *streamTranslate(input: {
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		abortSignal?: AbortSignal
		lowPriority?: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): AsyncGenerator<SentenceTranslationProviderStreamEvent> {
		const model = OpenAIModels.Standard

		const messages = this.getChatGPTTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		type TokenUsage = { inputTokens: number; outputTokens: number }
		let tokenUsage: TokenUsage | null = null

		for await (const chunk of this.openAIService.generateTextStreamChunks({
			model,
			messages: [
				...messages,
				{
					role: 'user',
					content: input.text,
				},
			],
			reasoningEffort: 'low',
			abortSignal: input.abortSignal,
			onUsage: (usage) => {
				tokenUsage = usage
			},
			lowPriority: input.lowPriority,
		})) {
			yield { type: 'chunk', text: chunk }
		}

		let providerUsage: null | {
			provider: 'chatgpt'
			inputTokens: number
			outputTokens: number
			model: OpenAIModels
			lowPriority: boolean
		} = null

		if (tokenUsage) {
			const finalizedTokenUsage = tokenUsage as TokenUsage

			providerUsage = {
				provider: 'chatgpt',
				inputTokens: finalizedTokenUsage.inputTokens,
				outputTokens: finalizedTokenUsage.outputTokens,
				model,
				lowPriority: Boolean(input.lowPriority),
			}
		}

		yield {
			type: 'done',
			usage: providerUsage,
		}
	}

	private getChatGPTTranslationTask(input: {
		sourceLanguageCode: string
		targetLanguageCode: string
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
