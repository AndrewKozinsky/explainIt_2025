import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class UpdateVideoDto {
	@DtoFieldDecorators('name', bdConfig.VideoPrivate.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('languageCode', bdConfig.VideoPrivate.dbFields.source_language_code, {
		required: false,
	})
	languageCode?: null | Language

	@DtoFieldDecorators('originalContent', bdConfig.VideoPrivate.dbFields.original_content)
	originalContent?: null | string

	@DtoFieldDecorators('fileName', bdConfig.VideoPrivate.dtoProps.fileName)
	fileName?: null | string

	@DtoFieldDecorators('fileMimeType', bdConfig.VideoPrivate.dtoProps.fileMimeType)
	fileMimeType?: null | string

	@DtoFieldDecorators('isFileUploaded', bdConfig.VideoPrivate.dbFields.is_file_uploaded)
	isFileUploaded?: boolean

	@DtoFieldDecorators('fileSizeMb', bdConfig.VideoPrivate.dbFields.file_size_mb, {
		required: false,
	})
	fileSizeMb?: number

	@DtoFieldDecorators('fileDurationSec', bdConfig.VideoPrivate.dbFields.file_duration_sec)
	fileDurationSec?: number
}
