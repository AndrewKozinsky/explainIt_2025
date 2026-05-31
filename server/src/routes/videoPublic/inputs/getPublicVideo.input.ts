import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetPublicVideoInput {
	@Field(() => Int, { description: 'Video id' })
	@DtoFieldDecorators('id', bdConfig.VideoPublic.dbFields.id)
	id: number

	@Field(() => String, { nullable: true, description: 'Target language for grammar concepts' })
	@DtoFieldDecorators('targetLanguageCode', bdConfig.GrammarConcept.dbFields.target_language_code, {
		required: false,
	})
	targetLanguageCode?: string
}
