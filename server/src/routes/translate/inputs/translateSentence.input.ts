import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class TranslateSentenceInput {
	@Field(() => Number, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@Field(() => String, { description: 'Sentence for translation' })
	@DtoFieldDecorators('text', bdConfig.SentenceTranslation.dtoProps.text)
	text: string

	@Field(() => String, { description: 'Source language code', nullable: true })
	@DtoFieldDecorators('sourceLanguageCode', bdConfig.SentenceTranslation.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | string

	@Field(() => String, { description: 'Target language code', nullable: true })
	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dtoProps.targetLanguageCode)
	targetLanguageCode?: null | string

	@Field(() => String, { description: 'Book name', nullable: true })
	@DtoFieldDecorators('bookName', bdConfig.SentenceTranslation.dtoProps.bookName)
	bookName?: string

	@Field(() => String, { description: 'Book author', nullable: true })
	@DtoFieldDecorators('bookAuthor', bdConfig.SentenceTranslation.dtoProps.bookAuthor)
	bookAuthor?: string

	@Field(() => String, { description: 'Video name', nullable: true })
	@DtoFieldDecorators('videoName', bdConfig.SentenceTranslation.dtoProps.videoName)
	videoName?: string

	@Field(() => String, { description: 'Video release year', nullable: true })
	@DtoFieldDecorators('videoYear', bdConfig.SentenceTranslation.dtoProps.videoYear)
	videoYear?: string
}
