import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BookChapterTranslateOfSentencesOutModel {
	@Field(() => [String])
	translates: string[]
}
