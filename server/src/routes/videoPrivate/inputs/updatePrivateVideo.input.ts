import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class UpdatePrivateVideoInput {
	@Field(() => Int, { description: 'Video id' })
	@DtoFieldDecorators('id', bdConfig.VideoPrivate.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number

	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.VideoPrivate.dbFields.name)
	name?: null | string

	@Field(() => String, { description: 'Subtitles', nullable: true })
	@DtoFieldDecorators('subtitles', bdConfig.VideoPrivate.dbFields.subtitles)
	subtitles?: null | string

	@Field(() => String, { description: 'File name', nullable: true })
	@DtoFieldDecorators('fileName', bdConfig.VideoPrivate.dtoProps.fileName)
	fileName?: null | string

	@Field(() => String, { description: 'File mime type', nullable: true })
	@DtoFieldDecorators('fileMimeType', bdConfig.VideoPrivate.dtoProps.fileMimeType)
	fileMimeType?: null | string
}
