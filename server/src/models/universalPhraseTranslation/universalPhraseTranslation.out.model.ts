import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'

const $ = bdConfig.UniversalPhraseTranslation.dbFields

export class TranslationExampleOutModel {
	@ApiProperty({ description: 'Example sentence in target language', type: String })
	sentence: string

	@ApiProperty({ description: 'Translation of the example sentence', type: String })
	translate: string
}

export class UsageGroupOutModel {
	@ApiProperty({ description: 'Usage group title', type: String })
	title: string

	@ApiProperty({ description: 'Explanation of the usage group', type: String })
	explain: string

	@ApiProperty({ description: 'Examples for this usage group', type: [TranslationExampleOutModel] })
	examples: TranslationExampleOutModel[]
}

export class PatternItemOutModel {
	@ApiProperty({ description: 'Pattern phrase', type: String })
	phrase: string

	@ApiProperty({ description: 'Translation of the pattern', type: String })
	translate: string
}

export class UniversalPhraseTranslationDataOutModel {
	@ApiProperty({ description: 'Core idea of the phrase', type: String })
	coreIdea: string

	@ApiProperty({ description: 'Usage groups with examples', type: [UsageGroupOutModel] })
	usageGroups: UsageGroupOutModel[]

	@ApiProperty({ description: 'Similar words or phrases', type: String, nullable: true })
	similarWords: null | string

	@ApiProperty({ description: 'Common mistakes when using this phrase', type: String, nullable: true })
	commonMistakes: null | string

	@ApiProperty({ description: 'Grammatical patterns', type: [PatternItemOutModel], nullable: true })
	patterns: null | PatternItemOutModel[]
}

export class UniversalPhraseTranslationOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.UniversalPhrase.dbFields.id))
	universalPhraseId: number

	@ApiProperty(getApiPropertyOptions($.target_language_code))
	targetLanguageCode: string

	@ApiProperty({
		description: 'Translation result from LLM',
		type: UniversalPhraseTranslationDataOutModel,
		nullable: true,
	})
	translation: null | UniversalPhraseTranslationDataOutModel

	@ApiProperty(getApiPropertyOptions($.status))
	status: string

	@ApiProperty(getApiPropertyOptions($.error_code))
	errorCode: null | string

	@ApiProperty(getApiPropertyOptions($.non_existent_word))
	nonExistentWord: boolean

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string

	@ApiProperty({ description: 'Transcription of the source phrase', type: TranscriptionOutModel, nullable: true })
	transcription: TranscriptionOutModel | null
}
