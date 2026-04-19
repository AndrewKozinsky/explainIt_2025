import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TranscriptionOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	universalPhraseId: number

	@Field(() => String, { nullable: true })
	ipa: string | null

	@Field(() => String, { nullable: true })
	pinyin: string | null
}
