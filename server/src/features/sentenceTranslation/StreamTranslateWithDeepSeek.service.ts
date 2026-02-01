import { Injectable } from '@nestjs/common'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { TranslateSentenceStreamEvent } from './TranslateSentence.command'

@Injectable()
export class StreamTranslateWithDeepSeek {
	constructor(
		private deepSeekService: DeepSeekService,
		private sentenceTranslationRepository: SentenceTranslationRepository,
	) {}

	async *streamTranslate(input: {
		userId: number
		sentenceId: number
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		abortSignal?: AbortSignal
		lowPriority?: boolean
	}): AsyncGenerator<TranslateSentenceStreamEvent> {
		const messages = this.getDeepSeekTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
		})

		let fullText = ''

		for await (const chunk of this.deepSeekService.generateTextStreamChunks({
			messages: [
				...messages,
				{
					role: 'user',
					content: input.text,
				},
			],
			abortSignal: input.abortSignal,
			onUsage: () => {
				// Пока не используем usage/биллинг для DeepSeek
			},
			lowPriority: input.lowPriority,
		})) {
			fullText += chunk
			yield { type: 'chunk', text: chunk }
		}

		const parsedResult = this.parseTranslationAndAnalysis(fullText)
		if (!parsedResult) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		await this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId: input.sentenceId,
			translation: parsedResult.translation,
			analysis: parsedResult.analysis,
		})

		yield { type: 'done' }
	}

	private getDeepSeekTranslationTask(input: { sourceLanguageCode: string; targetLanguageCode: string }) {
		return [
			{
				role: 'system',
				content:
					'Ты — помощник для изучающих иностранные языки. Переведи пользовательское предложение с языка ' +
					input.sourceLanguageCode +
					' на язык ' +
					input.targetLanguageCode +
					'. Ответ должен быть строго в формате:\n<перевод одной строкой>\n\n<подробный разбор в Markdown для изучающего язык: заголовки, списки, выделения, ключевые слова, устойчивые выражения, нюансы смысла.>',
			},
		] as const
	}

	private parseTranslationAndAnalysis(message: null | string): null | {
		translation: string
		analysis: null | string
	} {
		if (!message) return null

		const normalized = message.trim()
		if (!normalized) return null

		const parts = normalized.split(/\n\s*\n/)
		const translation = (parts[0] ?? '').trim()
		if (!translation) return null

		const analysis = parts.length > 1 ? parts.slice(1).join('\n\n').trim() : null

		return {
			translation,
			analysis: analysis ? analysis : null,
		}
	}
}
