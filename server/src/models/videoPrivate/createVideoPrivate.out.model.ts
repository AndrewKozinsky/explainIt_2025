import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateVideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: null | string

	@Field(() => String, { nullable: true })
	originalContent: null | string

	@Field(() => String, { nullable: true })
	processedContent: null | string

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => Int)
	userId: number
}
