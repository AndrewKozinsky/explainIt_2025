import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetSentenceTranslationInput {
	@Field(() => Int, { description: 'SentenceTranslation id' })
	@DtoFieldDecorators('id', bdConfig.SentenceTranslation.dbFields.id)
	id: number
}
