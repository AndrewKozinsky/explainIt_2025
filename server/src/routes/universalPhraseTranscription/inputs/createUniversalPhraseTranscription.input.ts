import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateUniversalPhraseTranscriptionInput {
	@Field(() => Int, { description: 'Universal phrase id' })
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id)
	universalPhraseId: number
}
