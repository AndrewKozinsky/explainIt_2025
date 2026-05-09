import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SentenceChatMessageOutModel } from './sentenceChatMessage.out.model'

@ObjectType()
export class SentenceChatThreadOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	sentenceId: number

	@Field(() => [SentenceChatMessageOutModel])
	messages: SentenceChatMessageOutModel[]

	@Field(() => String)
	createdAt: string

	@Field(() => String)
	updatedAt: string
}
