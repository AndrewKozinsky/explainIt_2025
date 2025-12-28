import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class AnalysePhraseInput {
	@Field(() => Int, { description: 'Book chapter id' })
	@DtoFieldDecorators('id', bdConfig.BookChapter.dbFields.id)
		bookChapterId: number

	@Field(() => String, { description: 'Book author', nullable: true })
	@DtoFieldDecorators('bookAuthor', {
		type: 'string',
		description: 'Name of the author book',
		required: false,
	})
		bookAuthor: null | string

	@Field(() => String, { description: 'Book name', nullable: true })
	@DtoFieldDecorators('bookAuthor', {
		type: 'string',
		description: 'Name of the book',
		required: false,
	})
		bookName: null | string

	@Field(() => String, { description: 'Context' })
	@DtoFieldDecorators('context', {
		type: 'string',
		description: 'Context of the sentence or phrase (5 sentences before and 5 after)',
		required: true,
	})
		context: string

	@Field(() => Number, { description: 'Порядковый номер предложения где находится фраза' })
	@DtoFieldDecorators('sentence', bdConfig.BookChapterPhrase.dbFields.sentenceId)
		sentenceId: number

	@Field(() => String, { description: 'Предложение где находится фраза' })
	@DtoFieldDecorators('sentence', bdConfig.BookChapterPhrase.dbFields.sentence)
		sentence: string

	@Field(() => String, { description: 'Фраза на иностранном языке для заучивания' })
	@DtoFieldDecorators('phrase', bdConfig.BookChapterPhrase.dbFields.phrase)
		phrase: string

	@Field(() => [Int], { description: 'Ids of the words in the phrase' })
	@DtoFieldDecorators('id', bdConfig.BookChapterPhrase.dbFields.phraseWordsIdx)
		phraseWordsIdx: number[]
}
