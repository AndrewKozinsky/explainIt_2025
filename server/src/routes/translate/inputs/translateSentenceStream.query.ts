import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class TranslateSentenceStreamQuery {
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@DtoFieldDecorators('text', bdConfig.SentenceTranslation.dtoProps.text)
	text: string

	@DtoFieldDecorators('isPublicMedia', bdConfig.SentenceTranslation.dtoProps.isPublicMedia)
	isPublicMedia: boolean

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.SentenceTranslation.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | string

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dtoProps.targetLanguageCode)
	targetLanguageCode?: null | string

	@DtoFieldDecorators('bookName', bdConfig.SentenceTranslation.dtoProps.bookName)
	bookName?: string

	@DtoFieldDecorators('bookAuthor', bdConfig.SentenceTranslation.dtoProps.bookAuthor)
	bookAuthor?: string

	@DtoFieldDecorators('videoName', bdConfig.SentenceTranslation.dtoProps.videoName)
	videoName?: string

	@DtoFieldDecorators('videoYear', bdConfig.SentenceTranslation.dtoProps.videoYear)
	videoYear?: string | number
}
