import { Injectable } from '@nestjs/common'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhrase/universalPhraseTranslation.repository'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { buildDictionaryDeepSectionsPrompt } from '../buildDictionaryDeepSectionsPrompt'
import { DICTIONARY_WRITER_MODEL } from '../dictionaryArticleConfig'
import { parseDeepSectionsResult } from '../parseUniversalPhraseTranslationResult'

/** Дописывает к готовой статье дополнительные разделы; пользователь увидит их при следующем открытии. */
@Injectable()
export class GenerateDictionaryDeepSections {
	constructor(
		private readonly translationRepository: UniversalPhraseTranslationRepository,
		private readonly llmAdapter: LlmAdapterService,
	) {}

	async generate(translationId: number): Promise<void> {
		const article = await this.translationRepository.findForDeepSections(translationId)
		if (!article?.translation || article.deepSections !== null) return

		const llmResponse = await this.llmAdapter.generate({
			model: DICTIONARY_WRITER_MODEL,
			messages: [
				{
					role: 'system',
					content: buildDictionaryDeepSectionsPrompt({
						sourceLanguageCode: article.sourceLanguageCode,
						targetLanguageCode: article.targetLanguageCode,
						phrase: article.phraseText,
						articleJson: article.translation,
					}),
				},
				{ role: 'user', content: article.phraseText },
			],
			responseFormat: 'json_object',
			reasoningEffort: 'low',
			lowPriority: true,
		})

		const deepSections = parseDeepSectionsResult(llmResponse.content)
		if (!deepSections) throw new Error(`Cannot parse deep sections of translation ${translationId}`)

		await this.translationRepository.saveDeepSections(translationId, deepSections)
	}
}
