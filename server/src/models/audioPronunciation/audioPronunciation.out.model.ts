import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AudioPronunciationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	wordId: number

	@Field(() => Int)
	voiceId: number

	@Field(() => String)
	audioUrl: string

	@Field(() => Int)
	duration: number
}
