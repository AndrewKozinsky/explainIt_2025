import { Field, InputType, Int } from '@nestjs/graphql'
import { IsIn } from 'class-validator'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetBookChapterInput {
	@Field(() => String, { description: 'Book type: public or private' })
	@IsIn(['public', 'private'], { message: 'Book type must be one of: public, private' })
	bookType: 'public' | 'private'

	@Field(() => Int, { description: 'BookChapter id' })
	@DtoFieldDecorators('id', bdConfig.BookChapter.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number
}
