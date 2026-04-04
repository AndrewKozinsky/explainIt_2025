import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

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

	@Field(() => String, { description: 'Language code', nullable: true })
	@DtoFieldDecorators('languageCode', bdConfig.VideoPrivate.dbFields.language_code)
	languageCode?: null | LanguageCode
}
