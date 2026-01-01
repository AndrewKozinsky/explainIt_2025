import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreatePrivateVideoInput {
	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.VideoPrivate.dbFields.name)
	name: null | string

	@Field(() => String, { description: 'Subtitles', nullable: true })
	@DtoFieldDecorators('subtitles', bdConfig.VideoPrivate.dbFields.subtitles)
	subtitles: null | string
}
