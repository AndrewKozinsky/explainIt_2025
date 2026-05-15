import { Content, GoogleGenAI } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { GoogleGeminiModels } from 'types/googleGeminiModels'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

@Injectable()
export class GoogleGeminiService {
	private ai: GoogleGenAI

	constructor(private mainConfig: MainConfigService) {
		const credentials = this.mainConfig.get().googleTts.serviceAccountCredentials

		this.ai = new GoogleGenAI({
			vertexai: true,
			project: credentials.project_id,
			location: 'us-central1',
			googleAuthOptions: { credentials },
		})
	}

	async generateText(input: { contents: Content[]; model?: GoogleGeminiModels; systemInstruction?: string }) {
		const response = await this.ai.models.generateContent({
			model: input.model ?? GoogleGeminiModels.Flash,
			contents: input.contents,
			config: { systemInstruction: input.systemInstruction },
		})

		const usage = response.usageMetadata

		if (!usage) {
			throw new CustomError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		const message = response.candidates?.[0]?.content?.parts?.[0]?.text ?? null

		return {
			inputTokens: usage.promptTokenCount ?? 0,
			outputTokens: usage.candidatesTokenCount ?? 0,
			message,
		}
	}

	async *generateTextStreamChunks(input: {
		contents: Content[]
		model?: GoogleGeminiModels
		systemInstruction?: string
		abortSignal?: AbortSignal
		onUsage?: (usage: null | { inputTokens: number; outputTokens: number }) => void
	}): AsyncGenerator<string, void, void> {
		const stream = await this.ai.models.generateContentStream({
			model: input.model ?? GoogleGeminiModels.Flash,
			contents: input.contents,
			config: { systemInstruction: input.systemInstruction },
		})

		let usageSent = false

		function maybeSendUsage(usage: null | { inputTokens: number; outputTokens: number }) {
			if (usageSent) return

			usageSent = true
			input.onUsage?.(usage)
		}

		try {
			for await (const chunk of stream) {
				if (input.abortSignal?.aborted) break

				const usage = chunk.usageMetadata

				if (usage?.promptTokenCount !== undefined && usage?.candidatesTokenCount !== undefined) {
					maybeSendUsage({
						inputTokens: usage.promptTokenCount,
						outputTokens: usage.candidatesTokenCount,
					})
				}

				const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text
				if (!text) continue

				yield text
			}
		} finally {
			maybeSendUsage(null)
		}
	}
}

export interface GoogleGeminiServiceI {
	generateText(input: { contents: Content[]; model?: GoogleGeminiModels }): Promise<{
		inputTokens: number
		outputTokens: number
		message: string | null
	}>
}

@Injectable()
export class GoogleGeminiServiceMock implements GoogleGeminiServiceI {
	async generateText(_input: { contents: Content[]; model?: GoogleGeminiModels }): Promise<any> {
		return {
			inputTokens: 100,
			outputTokens: 3000,
			message: 'Google Gemini message',
		}
	}
}
