import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { TokenUsageBalanceChargeCommand } from 'features/payment/TokenUsageBalanceCharge.command'
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
		private commandBus: CommandBus,
	) {}

	async *streamTranslate(input: {
		userId?: number
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

		type TokenUsage = { inputTokens: number; outputTokens: number }
		let tokenUsage: TokenUsage | null = null

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
			onUsage: (usage) => {
				tokenUsage = usage
			},
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

		if (input.userId && tokenUsage) {
			const usage: TokenUsage = tokenUsage

			await this.commandBus.execute(
				new TokenUsageBalanceChargeCommand({
					userId: input.userId,
					aiModelName: model,
					inputTokens: usage.inputTokens,
					outputTokens: usage.outputTokens,
				}),
			)
		}

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
					'. Ответ должен быть строго в формате:\n<перевод одной строкой>\n\n<подробный разбор в Markdown для изучающего язык: заголовки, списки, выделения, ключевые слова, устойчивые выражения, нюансы смысла.>',
			},
		] as const
	}

	private parseChatGPTTranslationAndAnalysis(message: null | string): null | {
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
