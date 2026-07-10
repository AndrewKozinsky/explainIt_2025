import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

export class GetPhraseTranslationsBySentenceInput {
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentencePhraseTranslation.dbFields.target_language_code)
	targetLanguageCode: LanguageCode
}
