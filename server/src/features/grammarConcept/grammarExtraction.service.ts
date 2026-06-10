import { Injectable } from '@nestjs/common'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { buildGrammarExtractionPrompt } from './buildGrammarExtractionPrompt'

@Injectable()
export class GrammarExtractionService {
	constructor(private llmAdapter: LlmAdapterService) {}

	async extractConcepts(input: {
		sentenceText: string
		sourceLanguage: string
	}): Promise<{ category: string; lemma: string }[]> {
		const provider: TranslationProviderName = 'gemini'

		const { systemPrompt, userPrompt } = buildGrammarExtractionPrompt(input.sentenceText, input.sourceLanguage)

		const result = await this.llmAdapter.generate({
			provider,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
			responseFormat: 'json_object',
		})

		return this.parseResponse(result.content)
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
