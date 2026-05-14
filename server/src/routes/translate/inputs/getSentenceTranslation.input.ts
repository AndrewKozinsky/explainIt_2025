import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

@InputType()
export class GetSentenceTranslationInput {
	@Field(() => Number, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@Field(() => String, { description: 'Target language code' })
	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dbFields.target_language_code)
	targetLanguageCode: LanguageCode
}
