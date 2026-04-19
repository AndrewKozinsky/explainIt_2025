import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UniversalAudioPronunciationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	universalPhraseId: number

	@Field(() => String)
	audioUrl: string

	@Field(() => Int)
	durationMs: number
}
