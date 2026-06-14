import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateUniversalPhraseAudioInput {
	@Field(() => Int, { description: 'Universal phrase id to create audio pronunciation for' })
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id)
	universalPhraseId: number
}
