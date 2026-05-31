import { Injectable } from '@nestjs/common'
import { DeepSeekService } from '../../infrastructure/deepSeek/deepSeek.service'
import { GoogleGeminiService } from '../../infrastructure/googleGemini/googleGemini.service'
import { OpenAIService } from '../../infrastructure/openAI/openAI.service'
import { buildGrammarExtractionPrompt } from './buildGrammarExtractionPrompt'

export type GrammarExtractionProvider = 'openai' | 'gemini' | 'deepseek'

@Injectable()
export class GrammarExtractionService {
	constructor(
		private openai: OpenAIService,
		private gemini: GoogleGeminiService,
		private deepseek: DeepSeekService,
	) {}

	async extractConcepts(input: {
		sentenceText: string
		sourceLanguage: string
	}): Promise<{ category: string; lemma: string }[]> {
		const provider: GrammarExtractionProvider = 'gemini'

		const { systemPrompt, userPrompt } = buildGrammarExtractionPrompt(input.sentenceText, input.sourceLanguage)

		let rawResponse: string

		if (provider === 'gemini') {
			const result = await this.gemini.generateText({
				contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
				systemInstruction: systemPrompt,
			})

			rawResponse = result.message ?? ''
		} else if (provider === 'openai') {
			const result = await this.openai.generateText({
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: userPrompt },
				],
				responseFormat: { type: 'json_object' },
			})

			rawResponse = result.message ?? ''
		} else {
			const result = await this.deepseek.generateText({
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: userPrompt },
				],
				responseFormat: { type: 'json_object' },
			})

			rawResponse = result.message ?? ''
		}

		return this.parseResponse(rawResponse)
	}

	private parseResponse(raw: string): { category: string; lemma: string }[] {
		try {
			// Gemini sometimes wraps JSON in markdown code blocks and adds trailing commas
			const cleaned = raw
				.replace(/^```(?:json)?\s*\n?/i, '')
				.replace(/\n?```\s*$/, '')
				.replace(/,(\s*[}\]])/g, '$1')
				.trim()

			const parsed = JSON.parse(cleaned)

			const items: unknown[] = parsed.items
			if (!items || !Array.isArray(items)) {
				return []
			}

			return items
				.filter(
					(item: unknown): item is { category: string; lemma: string } =>
						typeof item === 'object' &&
						item !== null &&
						typeof (item as Record<string, unknown>).category === 'string' &&
						typeof (item as Record<string, unknown>).lemma === 'string',
				)
				.map((item) => ({
					category: item.category,
					lemma: item.lemma,
				}))
		} catch {
			return []
		}
	}
}
