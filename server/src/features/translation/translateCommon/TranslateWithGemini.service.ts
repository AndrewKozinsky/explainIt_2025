import { Injectable } from '@nestjs/common'
import { GoogleGeminiService } from 'infrastructure/googleGemini/googleGemini.service'
import { LanguageCode } from 'prisma/generated/enums'
import {
	BuildPhrasePromptFn,
	BuildSentencePromptFn,
	PhraseTranslationProvider,
	SentenceTranslationProvider,
	TranslationProviderUsage,
} from './TranslationProvider.types'

@Injectable()
export class TranslateWithGemini implements SentenceTranslationProvider, PhraseTranslationProvider {
	readonly providerName = 'gemini' as const

	constructor(private googleGeminiService: GoogleGeminiService) {}
	async translate(
		input: {
			text: string
			contextText?: string
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
		const systemInstruction = buildPrompt({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			contextText: input.contextText,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		const response = await this.googleGeminiService.generateText({
			systemInstruction,
			contents: [{ role: 'user', parts: [{ text: input.text }] }],
		})

		const usage: TranslationProviderUsage = {
			provider: 'gemini',
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
			targetLanguageCode: LanguageCode
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildPhrasePromptFn,
	) {
		const systemInstruction = buildPrompt({
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
		})

		const response = await this.googleGeminiService.generateText({
			systemInstruction,
			contents: [{ role: 'user', parts: [{ text: systemInstruction }] }],
		})

		return {
			message: response.message ?? '',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
		}
	}
}
