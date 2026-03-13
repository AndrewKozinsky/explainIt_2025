import { Field, InputType, Int } from '@nestjs/graphql'
import { Language } from 'utils/languages'
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

	@Field(() => String, { description: 'Language code', nullable: true })
	@DtoFieldDecorators('languageCode', bdConfig.VideoPrivate.dbFields.language_code)
	languageCode?: null | Language

	@Field(() => String, { description: 'Original content', nullable: true })
	@DtoFieldDecorators('originalContent', bdConfig.VideoPrivate.dbFields.original_content)
	originalContent?: null | string

	@Field(() => String, { description: 'File name', nullable: true })
	@DtoFieldDecorators('fileName', bdConfig.VideoPrivate.dtoProps.fileName)
	fileName?: null | string

	@Field(() => String, { description: 'File mime type', nullable: true })
	@DtoFieldDecorators('fileMimeType', bdConfig.VideoPrivate.dtoProps.fileMimeType)
	fileMimeType?: null | string

	@Field(() => Boolean, { description: 'Is file was upload to S3', nullable: true })
	@DtoFieldDecorators('isFileUploaded', bdConfig.VideoPrivate.dbFields.is_file_uploaded, {
		type: 'boolean',
		required: false,
	})
	isFileUploaded?: boolean

	@Field(() => Number, { description: 'File size', nullable: true })
	@DtoFieldDecorators('fileSizeMb', bdConfig.VideoPrivate.dbFields.file_size_mb, {
		required: false,
	})
	fileSizeMb?: number
}
