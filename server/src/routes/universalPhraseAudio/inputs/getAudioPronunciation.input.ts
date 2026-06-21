import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetUniversalPhraseAudioInput {
	@Field(() => Int, { description: 'Universal phrase id to get audio pronunciation for' })
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id)
	universalPhraseId: number
}
