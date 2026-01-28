import { Injectable } from '@nestjs/common'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import type { TranslateSentenceStreamEvent } from 'features/translate/TranslateSentence.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { OpenAIModels, OpenAIService } from 'infrastructure/openAI/openAI.service'
import { SentenceTranslationProvider } from 'prisma/generated/client'

@Injectable()
export class StreamTranslateWithChatGPT {
	constructor(
		private openAIService: OpenAIService,
		private sentenceTranslationRepository: SentenceTranslationRepository,
	) {}

	async *streamTranslate(input: {
		sentenceId: number
		provider: Exclude<SentenceTranslationProvider, 'yandexTranslate'>
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		abortSignal?: AbortSignal
	}): AsyncGenerator<TranslateSentenceStreamEvent> {
		const model = this.getOpenAIModelByProvider(input.provider)

		const messages = this.getChatGPTTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
		})

		let fullText = ''

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
		})) {
			fullText += chunk
			yield { type: 'chunk', text: chunk }
		}

		const parsedResult = this.parseChatGPTTranslationAndAnalysis(fullText)
		if (!parsedResult) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		await this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId: input.sentenceId,
			provider: input.provider,
			translation: parsedResult.translation,
			analysis: parsedResult.analysis,
		})

		yield { type: 'done' }
	}

	private getOpenAIModelByProvider(provider: SentenceTranslationProvider): OpenAIModels {
		if (provider === 'chatGPTMini') return OpenAIModels.Mini
		if (provider === 'chatGPTStandard') return OpenAIModels.Standard

		return OpenAIModels.Nano
	}

	private getChatGPTTranslationTask(input: { sourceLanguageCode: string; targetLanguageCode: string }) {
		return [
			{
				role: 'system',
				content:
					'Ты — помощник для изучающих иностранные языки. Переведи пользовательское предложение с языка ' +
					input.sourceLanguageCode +
					' на язык ' +
					input.targetLanguageCode +
					'. Ответ должен быть строго в формате:\nTRANSLATION: <перевод одной строкой>\nANALYSIS: <подробный разбор для изучающего язык: грамматика, ключевые слова, устойчивые выражения, нюансы смысла, альтернативные варианты перевода, типичные ошибки.>',
			},
		] as const
	}

	private parseChatGPTTranslationAndAnalysis(
		message: null | string,
	): null | { translation: string; analysis: null | string } {
		if (!message) return null

		const translationMatch = message.match(/TRANSLATION:\s*(.*)/i)
		if (!translationMatch?.[1]) return null

		const translation = translationMatch[1].trim()
		const analysisMatch = message.match(/ANALYSIS:\s*([\s\S]*)/i)
		const analysis = analysisMatch?.[1] ? analysisMatch[1].trim() : null

		return {
			translation,
			analysis,
		}
	}
}
