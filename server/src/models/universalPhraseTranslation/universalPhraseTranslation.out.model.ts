import { Field, Int, ObjectType } from '@nestjs/graphql'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'

@ObjectType()
export class TranslationExampleOutModel {
	@Field(() => String)
	sentence: string

	@Field(() => String)
	translate: string
}

@ObjectType()
export class UsageGroupOutModel {
	@Field(() => String)
	title: string

	@Field(() => String)
	explain: string

	@Field(() => [TranslationExampleOutModel])
	examples: TranslationExampleOutModel[]
}

@ObjectType()
export class PatternItemOutModel {
	@Field(() => String)
	phrase: string

	@Field(() => String)
	translate: string
}

@ObjectType()
export class UniversalPhraseTranslationDataOutModel {
	@Field(() => String)
	coreIdea: string

	@Field(() => [UsageGroupOutModel])
	usageGroups: UsageGroupOutModel[]

	@Field(() => String, { nullable: true })
	similarWords: null | string

	@Field(() => String, { nullable: true })
	commonMistakes: null | string

	@Field(() => [PatternItemOutModel], { nullable: true })
	patterns: null | PatternItemOutModel[]
}

@ObjectType()
export class UniversalPhraseTranslationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	universalPhraseId: number

	@Field(() => String)
	targetLanguageCode: string

	@Field(() => UniversalPhraseTranslationDataOutModel, { nullable: true })
	translation: null | UniversalPhraseTranslationDataOutModel

	@Field(() => String)
	status: string

	@Field(() => String, { nullable: true })
	errorMessage: null | string

	@Field(() => Boolean)
	nonExistentWord: boolean

	@Field(() => String)
	createdAt: string

	@Field(() => TranscriptionOutModel, { nullable: true })
	transcription: TranscriptionOutModel | null
}
