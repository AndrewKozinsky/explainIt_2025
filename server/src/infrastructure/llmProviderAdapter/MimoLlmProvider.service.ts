import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { MimoModels, AIProviderName } from 'types/AIModels'
import { MimoService } from 'infrastructure/mimo/mimo.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmMessage, LlmProvider, LlmStreamInput } from './LlmProvider.interface'

@Injectable()
export class MimoLlmProvider implements LlmProvider {
	readonly name: AIProviderName = 'mimo'

	constructor(private mimoService: MimoService) {}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const messages = this.convertMessages(input.messages)

		const response = await this.mimoService.generateText({
			messages,
			model: input.model ?? MimoModels.Flash,
			responseFormat: input.responseFormat
				? input.responseFormat === 'json_object'
					? { type: 'json_object' }
					: { type: 'text' }
				: undefined,
			reasoningEffort: input.reasoningEffort,
			lowPriority: input.lowPriority ?? false,
		})

		return {
			content: response.message ?? '',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
		}
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const messages = this.convertMessages(input.messages)

		const chunks = this.mimoService.generateTextStreamChunks({
			messages,
			model: input.model ?? MimoModels.Flash,
			responseFormat: input.responseFormat
				? input.responseFormat === 'json_object'
					? { type: 'json_object' }
					: { type: 'text' }
				: undefined,
			abortSignal: input.abortSignal,
			onUsage: input.onUsage,
			lowPriority: input.lowPriority ?? false,
		})

		for await (const chunk of chunks) {
			yield chunk
		}
	}

	// ---- private ----

	private convertMessages(messages: LlmMessage[]): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
		return messages.map(function (message) {
			return {
				role: message.role,
				content: message.content,
			} as OpenAI.Chat.Completions.ChatCompletionMessageParam
		})
	}
}
