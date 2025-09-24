import { Field, ObjectType } from '@nestjs/graphql'
import { BookChapterPhraseOutModel } from 'models/bookChapterPhrase/bookChapterPhrase.out.model'

@ObjectType()
export class SentenceAndPhraseAnalysesOutModel {
	@Field(() => String, { nullable: false })
	sentenceTranslation: string

	@Field(() => BookChapterPhraseOutModel, { nullable: false })
	phrase: BookChapterPhraseOutModel
}
