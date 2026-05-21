import { Field, InputType, Int } from '@nestjs/graphql'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreatePrivateVideoInput {
	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.VideoPrivate.dbFields.name)
	name?: null | string

	@Field(() => String, { description: 'Text', nullable: true })
	@DtoFieldDecorators('originalContent', bdConfig.VideoPrivate.dbFields.original_content)
	originalContent?: null | string

	@Field(() => Int, { description: 'File size in MB', nullable: true })
	@DtoFieldDecorators('fileSizeMb', bdConfig.VideoPrivate.dbFields.file_size_mb, {
		required: false,
	})
	fileSizeMb?: number

	@Field(() => Int, { description: 'File duration in seconds', nullable: true })
	@DtoFieldDecorators('fileDurationSec', bdConfig.VideoPrivate.dbFields.file_duration_sec, {
		required: false,
	})
	fileDurationSec?: number

	@Field(() => String, { description: 'Language code' })
	@DtoFieldDecorators('languageCode', bdConfig.VideoPrivate.dbFields.source_language_code, { required: true })
	languageCode: Language
}
