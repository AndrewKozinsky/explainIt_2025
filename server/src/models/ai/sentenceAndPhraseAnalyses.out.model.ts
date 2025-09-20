import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SentenceAndPhraseAnalysesOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: false })
	sentenceTranslation: string
}
