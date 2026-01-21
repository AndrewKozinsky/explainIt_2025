import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EngRusDictionaryItemOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	engPhrase: string

	@Field(() => String)
	rusPhrase: string

	@Field(() => String, { nullable: true })
	transcription: string | null

	@Field(() => String, { nullable: true })
	lexemes: string | null
}
