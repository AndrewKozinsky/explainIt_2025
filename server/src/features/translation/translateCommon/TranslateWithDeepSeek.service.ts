import { Injectable } from '@nestjs/common'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { LanguageCode } from 'prisma/generated/enums'
import {
	BuildPhrasePromptFn,
	BuildSentencePromptFn,
	PhraseTranslationProvider,
	SentenceTranslationProvider,
	TranslationProviderUsage,
} from './TranslationProvider.types'

@Injectable()
export class TranslateWithDeepSeek implements SentenceTranslationProvider, PhraseTranslationProvider {
	readonly providerName = 'deepseek' as const

	constructor(private deepSeekService: DeepSeekService) {}

	async translate(
		input: {
			text: string
			sourceLanguageCode: LanguageCode
			lowPriority?: boolean
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildSentencePromptFn,
	) {
		const messages = this.getTranslationTask(
			{
				sourceLanguageCode: input.sourceLanguageCode,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				videoYear: input.videoYear,
			},
			buildPrompt,
		)

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

		const usage: TranslationProviderUsage = {
			provider: 'deepseek',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
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
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildPhrasePromptFn,
	) {
		const response = await this.deepSeekService.generateText({
			messages: [
				{
					role: 'system',
					content: buildPrompt({
						sourceLanguageCode: input.sourceLanguageCode,
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
