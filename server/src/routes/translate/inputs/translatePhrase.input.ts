import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

export class TranslatePhraseInput {
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@DtoFieldDecorators('text', bdConfig.SentenceTranslation.dtoProps.text)
	text: string

	@DtoFieldDecorators('selectedWord', bdConfig.SentencePhraseTranslation.dtoProps.phrase)
	selectedWord: string

	@DtoFieldDecorators('selectedWordStartOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_start_offset)
	selectedWordStartOffset: number

	@DtoFieldDecorators('selectedWordEndOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_end_offset)
	selectedWordEndOffset: number

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.SentenceTranslation.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | LanguageCode

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentencePhraseTranslation.dbFields.target_language_code)
	targetLanguageCode: LanguageCode

	@DtoFieldDecorators('bookName', bdConfig.SentenceTranslation.dtoProps.bookName)
	bookName?: string

	@DtoFieldDecorators('bookAuthor', bdConfig.SentenceTranslation.dtoProps.bookAuthor)
	bookAuthor?: string

	@DtoFieldDecorators('videoName', bdConfig.SentenceTranslation.dtoProps.videoName)
	videoName?: string

	@DtoFieldDecorators('videoYear', bdConfig.SentenceTranslation.dtoProps.videoYear)
	videoYear?: string
}
