import { Injectable } from '@nestjs/common'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { LanguageCode } from 'prisma/generated/enums'
import { buildSentenceTranslationPrompt } from './buildSentenceTranslationPrompt'
import { SentenceTranslationProvider, SentenceTranslationProviderStreamEvent } from './SentenceTranslationProvider'

@Injectable()
export class StreamTranslateWithDeepSeek implements SentenceTranslationProvider {
	readonly providerName = 'deepseek' as const

	constructor(private deepSeekService: DeepSeekService) {}

	async *streamTranslate(input: {
		text: string
		sourceLanguageCode: LanguageCode
		targetLanguageCode: LanguageCode
		abortSignal?: AbortSignal
		lowPriority?: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): AsyncGenerator<SentenceTranslationProviderStreamEvent> {
		const messages = this.getDeepSeekTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		type TokenUsage = { inputTokens: number; outputTokens: number }
		let tokenUsage: TokenUsage | null = null

		for await (const chunk of this.deepSeekService.generateTextStreamChunks({
			messages: [
				...messages,
				{
					role: 'user',
					content: input.text,
				},
			],
			abortSignal: input.abortSignal,
			onUsage: (usage) => {
				tokenUsage = usage ?? null
			},
			lowPriority: input.lowPriority,
		})) {
			yield { type: 'chunk', text: chunk }
		}

		let providerUsage: null | { provider: 'deepseek'; inputTokens: number; outputTokens: number } = null

		if (tokenUsage) {
			const finalizedTokenUsage = tokenUsage as TokenUsage

			providerUsage = {
				provider: 'deepseek',
				inputTokens: finalizedTokenUsage.inputTokens,
				outputTokens: finalizedTokenUsage.outputTokens,
			}
		}

		yield {
			type: 'done',
			usage: providerUsage,
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
