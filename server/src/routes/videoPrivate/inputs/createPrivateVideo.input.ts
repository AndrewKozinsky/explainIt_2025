import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreatePrivateVideoInput {
	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.VideoPrivate.dbFields.name)
	name?: null | string

	@Field(() => String, { description: 'Text', nullable: true })
	@DtoFieldDecorators('subtitles', bdConfig.VideoPrivate.dbFields.content)
	content?: null | string

	@Field(() => Int, { description: 'File size in MB', nullable: true })
	@DtoFieldDecorators('fileSizeMb', bdConfig.VideoPrivate.dbFields.file_size_mb)
	fileSizeMb?: number
}
