import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetSentenceTranslationInput {
	@Field(() => Number, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number
}
