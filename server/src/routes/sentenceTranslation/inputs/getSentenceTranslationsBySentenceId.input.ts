import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetSentenceTranslationsBySentenceIdInput {
	@Field(() => Int, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number
}
