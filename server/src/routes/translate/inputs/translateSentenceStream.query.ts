import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class TranslateSentenceStreamQuery {
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@DtoFieldDecorators('text', bdConfig.SentenceTranslation.dtoProps.text)
	text: string

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.SentenceTranslation.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | string

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dtoProps.targetLanguageCode)
	targetLanguageCode?: null | string
}
