import { Injectable } from '@nestjs/common'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { LanguageCode } from 'prisma/generated/enums'
import { buildPhraseTranslationPrompt } from './buildPhraseTranslationPrompt'

@Injectable()
export class TranslatePhraseWithDeepSeek {
	constructor(private deepSeekService: DeepSeekService) {}

	async translatePhrase(input: {
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
	}) {
		return this.deepSeekService.generateText({
			messages: [
				{
					role: 'system',
					content: buildPhraseTranslationPrompt({
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
			lowPriority: true,
		})
	}
}
