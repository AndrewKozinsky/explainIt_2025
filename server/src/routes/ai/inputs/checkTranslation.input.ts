import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class CheckTranslationInput {
	@Field(() => String, { description: 'Sentence in Russian' })
	@DtoFieldDecorators('rusSentence', bdConfig.AI.dtoProps.rusSentence)
		rusSentence: string

	@Field(() => String, { description: 'Sentence in English' })
	@DtoFieldDecorators('engSentence', bdConfig.AI.dtoProps.engSentence)
		engSentence: string
}
