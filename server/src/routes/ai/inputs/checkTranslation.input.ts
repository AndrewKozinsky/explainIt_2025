import { Field, InputType } from '@nestjs/graphql'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'
import { bdConfig } from 'src/db/dbConfig/dbConfig'

@InputType()
export class CheckTranslationInput {
	@Field(() => String, { description: 'Sentence in Russian' })
	@DtoFieldDecorators('rusSentence', bdConfig.AI.dtoProps.rusSentence)
	rusSentence: string

	@Field(() => String, { description: 'Sentence in English' })
	@DtoFieldDecorators('engSentence', bdConfig.AI.dtoProps.engSentence)
	engSentence: string
}
