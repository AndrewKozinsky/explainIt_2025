import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

@InputType()
export class TranslatePhraseInput {
	@Field(() => Number, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@Field(() => String, { description: 'Full sentence text' })
	@DtoFieldDecorators('text', bdConfig.SentenceTranslation.dtoProps.text)
	text: string

	@Field(() => String, { description: 'Selected word text' })
	@DtoFieldDecorators('selectedWord', bdConfig.SentencePhraseTranslation.dtoProps.phrase)
	selectedWord: string

	@Field(() => Number, { description: 'Selected word start offset in sentence' })
	@DtoFieldDecorators('selectedWordStartOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_start_offset)
	selectedWordStartOffset: number

	@Field(() => Number, { description: 'Selected word end offset in sentence (end-exclusive)' })
	@DtoFieldDecorators('selectedWordEndOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_end_offset)
	selectedWordEndOffset: number

	@Field(() => String, { description: 'Source language code', nullable: true })
	@DtoFieldDecorators('sourceLanguageCode', bdConfig.SentenceTranslation.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | LanguageCode

	@Field(() => String, { description: 'Target language code', nullable: true })
	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dtoProps.targetLanguageCode)
	targetLanguageCode?: null | LanguageCode

	@Field(() => String, { nullable: true })
	@DtoFieldDecorators('bookName', bdConfig.SentenceTranslation.dtoProps.bookName)
	bookName?: string

	@Field(() => String, { nullable: true })
	@DtoFieldDecorators('bookAuthor', bdConfig.SentenceTranslation.dtoProps.bookAuthor)
	bookAuthor?: string

	@Field(() => String, { nullable: true })
	@DtoFieldDecorators('videoName', bdConfig.SentenceTranslation.dtoProps.videoName)
	videoName?: string

	@Field(() => String, { nullable: true })
	@DtoFieldDecorators('videoYear', bdConfig.SentenceTranslation.dtoProps.videoYear)
	videoYear?: string
}
