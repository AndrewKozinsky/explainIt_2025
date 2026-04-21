import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SentenceChatMessageOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	threadId: number

	@Field(() => String)
	role: 'user' | 'assistant'

	@Field(() => String)
	content: string

	@Field(() => String)
	status: 'streaming' | 'completed' | 'canceled' | 'failed'

	@Field(() => String, { nullable: true })
	errorMessage: null | string

	@Field(() => String)
	createdAt: string

	@Field(() => String)
	updatedAt: string
}
