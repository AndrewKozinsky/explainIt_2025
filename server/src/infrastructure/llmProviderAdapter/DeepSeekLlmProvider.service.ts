import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmMessage, LlmProvider, LlmStreamInput } from './LlmProvider.interface'

@Injectable()
export class DeepSeekLlmProvider implements LlmProvider {
	readonly name: TranslationProviderName = 'deepseek'

	constructor(private deepSeekService: DeepSeekService) {}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const messages = this.convertMessages(input.messages)

		const response = await this.deepSeekService.generateText({
			messages,
			responseFormat: input.responseFormat
				? input.responseFormat === 'json_object'
					? { type: 'json_object' }
					: { type: 'text' }
				: undefined,
			reasoningEffort: input.reasoningEffort,
			lowPriority: input.lowPriority,
		})

		return {
			content: response.message ?? '',
			inputTokens: response.inputTokens,
			outputTokens: response.outputTokens,
		}
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const messages = this.convertMessages(input.messages)

		const chunks = this.deepSeekService.generateTextStreamChunks({
			messages,
			abortSignal: input.abortSignal,
			onUsage: input.onUsage,
			lowPriority: input.lowPriority,
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
