import { Injectable } from '@nestjs/common'
import { OpenAIModels } from 'types/openAIModels'
import { OpenAIService } from 'infrastructure/openAI/openAI.service'
import { LanguageCode } from 'prisma/generated/enums'
import {
	BuildPhrasePromptFn,
	BuildSentencePromptFn,
	PhraseTranslationProvider,
	SentenceTranslationProvider,
	TranslationProviderUsage,
} from './TranslationProvider.types'

@Injectable()
export class TranslateWithChatGPT implements SentenceTranslationProvider, PhraseTranslationProvider {
	readonly providerName = 'chatgpt' as const

	constructor(private openAIService: OpenAIService) {}

	async translate(
		input: {
			text: string
			sourceLanguageCode: LanguageCode
			targetLanguageCode: LanguageCode
			lowPriority?: boolean
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildSentencePromptFn,
	) {
		const model = OpenAIModels.Standard

		const messages = this.getTranslationTask(
			{
				sourceLanguageCode: input.sourceLanguageCode,
				targetLanguageCode: input.targetLanguageCode,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				videoYear: input.videoYear,
			},
			buildPrompt,
		)

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

		const usage: TranslationProviderUsage = {
			provider: 'chatgpt',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
			model,
			lowPriority: Boolean(input.lowPriority),
		}

		return {
			translatedText: response.message ?? '',
			usage,
		}
	}

	async translatePhrase(
		input: {
			text: string
			selectedWord: string
			selectedWordStartOffset: number
			selectedWordEndOffset: number
			sourceLanguageCode: LanguageCode
			targetLanguageCode: LanguageCode
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildPhrasePromptFn,
	) {
		const model = OpenAIModels.Standard

		const response = await this.openAIService.generateText({
			model,
			messages: [
				{
					role: 'system',
					content: buildPrompt({
						sourceLanguageCode: input.sourceLanguageCode,
						targetLanguageCode: input.targetLanguageCode,
						sentenceText: input.text,
						selectedWord: input.selectedWord,
						selectedWordStartOffset: input.selectedWordStartOffset,
						selectedWordEndOffset: input.selectedWordEndOffset,
						bookName: input.bookName,
						bookAuthor: input.bookAuthor,
						videoName: input.videoName,
						videoYear: input.videoYear,
					}),
				},
			],
			reasoningEffort: 'low',
			lowPriority: true,
		})

		return {
			message: response.message ?? '',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
		}
	}

	private getTranslationTask(
		input: {
			sourceLanguageCode: LanguageCode
			targetLanguageCode: LanguageCode
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildSentencePromptFn,
	) {
		return [
			{
				role: 'system',
				content: buildPrompt(input),
			},
		] as const
	}
}
