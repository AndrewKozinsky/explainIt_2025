import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetWordInput {
	@Field(() => String, { description: 'Word text' })
	@DtoFieldDecorators('word', bdConfig.Word.dbFields.word, { type: 'string', required: true })
	word: string
}
