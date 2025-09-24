import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookLiteOutModel, BookOutModel } from '../book/book.out.model'

@ObjectType()
export class BookChapterPhraseExampleOutModel {
	@Field(() => Int)
	id: number
}
