import {
	SentencePhraseTranslationExampleOutModel,
	SentencePhraseTranslationOutModel,
} from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'
import { SentenceTranslationOutModel } from 'models/sentenceTranslation/sentenceTranslation.out.model'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { SentenceTranslation } from 'prisma/generated/client'
import { SentencePhraseTranslation } from 'prisma/generated/client'

export function mapSentenceTranslation(
	translations: SentenceTranslation[],
	targetLanguageCode?: string,
): SentenceTranslationOutModel | null {
	const translation = targetLanguageCode
		? translations.find((t) => t.target_language_code === targetLanguageCode)
		: translations[0]

	if (!translation) {
		return null
	}

	return {
		id: translation.id,
		sentenceId: translation.sentence_id,
		translation: translation.translation,
		createdAt: translation.created_at.toISOString(),
	}
}

export function mapSentencePhraseTranslations(
	phraseTranslations: SentencePhraseTranslation[],
	targetLanguageCode?: string,
	universalPhraseByText?: Map<string, UniversalPhraseOutModel>,
): SentencePhraseTranslationOutModel[] | null {
	const filtered = targetLanguageCode
		? phraseTranslations.filter((pt) => pt.target_language_code === targetLanguageCode)
		: phraseTranslations

	if (filtered.length === 0) {
		return null
	}

	return filtered.map((pt) => {
		const examples = decodeExamples(pt.examples)

		return {
			id: pt.id,
			sentenceId: pt.sentence_id,
			phrase: pt.phrase,
			phraseStartOffset: pt.phrase_start_offset,
			phraseEndOffset: pt.phrase_end_offset,
			translate: pt.translate,
			examples,
			status: pt.status,
			errorMessage: pt.error_message,
			createdAt: pt.created_at.toISOString(),
			updatedAt: pt.updated_at.toISOString(),
			flashcardId: null,
			universalPhrase: universalPhraseByText?.get(pt.phrase) ?? null,
		}
	})
}

function decodeExamples(examples: string[]): SentencePhraseTranslationExampleOutModel[] {
	const decoded: SentencePhraseTranslationExampleOutModel[] = []

	for (let i = 0; i + 1 < examples.length; i += 2) {
		const text = examples[i]
		const translate = examples[i + 1]

		if (!text || !translate) {
			continue
		}

		decoded.push({ text, translate })
	}

	return decoded
}
