import type {
	UniversalPhraseTranslationOutModel,
	UsageGroupOutModel,
	TranslationExampleOutModel,
	PatternItemOutModel,
	TranscriptionOutModel,
} from '@/shared/api/generated/models'
import { universalPhraseTranslationControllerGetOrCreateTranslation } from '@/shared/api/generated/universal-phrase-translation/universal-phrase-translation'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	ExampleModel,
	GetOrCreateTranslationInput,
	PatternItemModel,
	PhraseTranslationDataModel,
	PhraseTranslationModel,
	PhraseTranslationRepository,
	TranslationStatus,
	UsageGroupModel,
} from './PhraseTranslationRepository'
import type { TranscriptionModel } from '../../phrase/repository/PhraseRepository'

/**
 * Реализация PhraseTranslationRepository через REST API.
 */
export class PhraseTranslationApi implements PhraseTranslationRepository {
	async getOrCreateTranslation(
		input: GetOrCreateTranslationInput,
		signal?: AbortSignal,
	): Promise<ApiResult<PhraseTranslationModel>> {
		return executeApiCall(
			() => universalPhraseTranslationControllerGetOrCreateTranslation(input, { signal }),
			(data) => mapToPhraseTranslation(data),
		)
	}
}

// ─── Mappers ────────────────────────────────────────────────────────────────

function mapToPhraseTranslation(raw: UniversalPhraseTranslationOutModel): PhraseTranslationModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId ?? null,
		targetLanguageCode: raw.targetLanguageCode,
		translation: raw.translation ? mapToTranslationData(raw.translation) : null,
		status: mapStatus(raw.status),
		errorMessage: raw.errorMessage ?? null,
		nonExistentWord: raw.nonExistentWord,
		createdAt: raw.createdAt,
		transcription: raw.transcription ? mapToTranscription(raw.transcription) : null,
	}
}

function mapToTranslationData(raw: {
	coreIdea: string
	usageGroups: UsageGroupOutModel[]
	similarWords: string | null
	commonMistakes: string | null
	patterns: PatternItemOutModel[] | null
}): PhraseTranslationDataModel {
	return {
		coreIdea: raw.coreIdea,
		usageGroups: raw.usageGroups.map(mapToUsageGroup),
		similarWords: raw.similarWords,
		commonMistakes: raw.commonMistakes,
		patterns: raw.patterns ? raw.patterns.map(mapToPattern) : null,
	}
}

function mapToUsageGroup(raw: UsageGroupOutModel): UsageGroupModel {
	return {
		title: raw.title,
		explain: raw.explain,
		examples: raw.examples.map(mapToExample),
	}
}

function mapToExample(raw: TranslationExampleOutModel): ExampleModel {
	return {
		sentence: raw.sentence,
		translate: raw.translate,
	}
}

function mapToPattern(raw: PatternItemOutModel): PatternItemModel {
	return {
		phrase: raw.phrase,
		translate: raw.translate,
	}
}

function mapToTranscription(raw: TranscriptionOutModel): TranscriptionModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId,
		ipa: raw.ipa ?? null,
		pinyin: raw.pinyin ?? null,
	}
}

function mapStatus(raw: string): TranslationStatus {
	if (raw === 'pending' || raw === 'ready' || raw === 'error') {
		return raw
	}
	return 'error'
}
