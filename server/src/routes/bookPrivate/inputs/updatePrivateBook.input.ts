import { Field, InputType, Int } from '@nestjs/graphql'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class UpdatePrivateBookInput {
	@Field(() => Int, { description: 'Book id' })
	@DtoFieldDecorators('id', bdConfig.BookPrivate.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number

	@Field(() => String, { description: 'Author', nullable: true })
	@DtoFieldDecorators('author', bdConfig.BookPrivate.dbFields.author)
	author?: null | string

	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.BookPrivate.dbFields.name)
	name?: null | string

	@Field(() => String, { description: 'Language code', nullable: true })
	@DtoFieldDecorators('languageCode', bdConfig.BookPrivate.dbFields.source_language_code)
	languageCode?: null | Language

	@Field(() => String, { description: 'Note', nullable: true })
	@DtoFieldDecorators('note', bdConfig.BookPrivate.dbFields.note)
	note?: null | string

	@Field(() => String, { description: 'File name', nullable: true })
	@DtoFieldDecorators('fileName', bdConfig.BookPrivate.dtoProps.fileName)
	fileName?: null | string

	@Field(() => String, { description: 'File mime type', nullable: true })
	@DtoFieldDecorators('fileMimeType', bdConfig.BookPrivate.dtoProps.fileMimeType)
	fileMimeType?: null | string

	@Field(() => Boolean, { description: 'Is file was upload to S3', nullable: true })
	@DtoFieldDecorators('isFileUploaded', bdConfig.BookPrivate.dbFields.is_file_uploaded, {
		type: 'boolean',
		required: false,
	})
	isFileUploaded?: boolean
}
