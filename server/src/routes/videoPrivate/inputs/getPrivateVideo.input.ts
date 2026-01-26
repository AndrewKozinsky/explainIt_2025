import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetPrivateVideoInput {
	@Field(() => Int, { description: 'Video id' })
	@DtoFieldDecorators('id', bdConfig.VideoPrivate.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number
}
