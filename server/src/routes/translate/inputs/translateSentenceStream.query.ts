import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { SentenceTranslationProvider } from 'prisma/generated/client'

export class TranslateSentenceStreamQuery {
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@DtoFieldDecorators('provider', bdConfig.SentenceTranslation.dbFields.provider)
	provider: SentenceTranslationProvider

	@DtoFieldDecorators('text', bdConfig.SentenceTranslation.dtoProps.text)
	text: string

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.SentenceTranslation.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | string

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dtoProps.targetLanguageCode)
	targetLanguageCode?: null | string
}
