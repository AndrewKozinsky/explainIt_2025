import { Content } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { GoogleGeminiModels } from 'types/googleGeminiModels'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { GoogleGeminiService } from 'infrastructure/googleGemini/googleGemini.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmMessage, LlmProvider, LlmStreamInput } from './LlmProvider.interface'

@Injectable()
export class GeminiLlmProvider implements LlmProvider {
	readonly name: TranslationProviderName = 'gemini'

	constructor(private googleGeminiService: GoogleGeminiService) {}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const { systemInstruction, contents } = this.convertMessages(input.messages)

		const response = await this.googleGeminiService.generateText({
			contents,
			systemInstruction,
			model: GoogleGeminiModels.Flash,
		})

		return {
			content: response.message ?? '',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
		}
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const { systemInstruction, contents } = this.convertMessages(input.messages)

		const chunks = this.googleGeminiService.generateTextStreamChunks({
			contents,
			systemInstruction,
			model: GoogleGeminiModels.Flash,
			abortSignal: input.abortSignal,
			onUsage: input.onUsage,
		})

		for await (const chunk of chunks) {
			yield chunk
		}
	}

	// ---- private ----

	private convertMessages(messages: LlmMessage[]): {
		systemInstruction?: string
		contents: Content[]
	} {
		const systemMessage = messages.find((m) => m.role === 'system')
		const nonSystem = messages.filter((m) => m.role !== 'system')

		let contents: Content[] = nonSystem.map(function (m) {
			return {
				role: m.role === 'assistant' ? 'model' : 'user',
				parts: [{ text: m.content }],
			}
		})

		// Gemini требует непустой contents. Если передали только system-сообщение,
		// дублируем его как user — повторяет поведение старого TranslateWithGemini.
		if (contents.length === 0 && systemMessage) {
			contents = [{ role: 'user', parts: [{ text: systemMessage.content }] }]
		}

		return {
			systemInstruction: systemMessage?.content,
			contents,
		}
	}
}
