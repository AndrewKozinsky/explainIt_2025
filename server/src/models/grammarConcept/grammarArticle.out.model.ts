import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GrammarArticleOutModel {
	@Field(() => String)
	title: string

	@Field(() => String)
	content: string

	@Field(() => String)
	compiledSource: string
}
