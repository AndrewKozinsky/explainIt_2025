import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class GetTranscriptionInput {
	@Field(() => String, { description: 'Sentence in English' })
	@DtoFieldDecorators('engSentence', bdConfig.AI.dtoProps.engSentence)
	engSentence: string
}
