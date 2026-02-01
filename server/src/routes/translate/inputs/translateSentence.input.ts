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
}
