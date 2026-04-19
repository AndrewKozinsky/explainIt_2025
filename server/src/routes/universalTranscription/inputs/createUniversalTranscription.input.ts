import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateUniversalTranscriptionInput {
	@Field(() => Int, { description: 'Universal phrase id' })
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalTranscription.dbFields.universal_phrase_id, {
		type: 'number',
		required: true,
		min: 1,
	})
	universalPhraseId: number
}
