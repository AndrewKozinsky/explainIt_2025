import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { ZaiModels, AIProviderName } from 'types/AIModels'
import { ZaiService } from 'infrastructure/zai/zai.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmMessage, LlmProvider, LlmStreamInput } from './LlmProvider.interface'

@Injectable()
export class ZaiLlmProvider implements LlmProvider {
	readonly name: AIProviderName = 'zai'

	constructor(private zaiService: ZaiService) {}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const messages = this.convertMessages(input.messages)

		const response = await this.zaiService.generateText({
			messages,
			model: input.model ?? ZaiModels.Flash,
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

		const chunks = this.zaiService.generateTextStreamChunks({
			messages,
			model: input.model ?? ZaiModels.Flash,
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
		return messages.map(function (m) {
			return {
				role: m.role,
				content: m.content,
			} as OpenAI.Chat.Completions.ChatCompletionMessageParam
		})
	}
}
