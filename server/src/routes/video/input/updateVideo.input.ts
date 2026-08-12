import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class UpdateVideoInput {
	@DtoFieldDecorators('name', bdConfig.Video.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('originalContent', bdConfig.Video.dbFields.original_content)
	originalContent?: null | string

	@DtoFieldDecorators('fileName', bdConfig.Video.dtoProps.fileName)
	fileName?: null | string

	@DtoFieldDecorators('fileMimeType', bdConfig.Video.dtoProps.fileMimeType)
	fileMimeType?: null | string

	@DtoFieldDecorators('isFileUploaded', bdConfig.Video.dbFields.is_file_uploaded)
	isFileUploaded?: boolean

	@DtoFieldDecorators('fileSizeMb', bdConfig.Video.dbFields.file_size_mb, {
		required: false,
	})
	fileSizeMb?: number

	@DtoFieldDecorators('durationSec', bdConfig.Video.dbFields.duration_sec, {
		required: false,
	})
	durationSec?: number

	@DtoFieldDecorators('languageCode', bdConfig.Video.dbFields.source_language_code, {
		required: false,
	})
	languageCode?: Language

	@DtoFieldDecorators('coverFileName', bdConfig.Video.dtoProps.coverFileName)
	coverFileName?: null | string

	@DtoFieldDecorators('coverFileMimeType', bdConfig.Video.dtoProps.coverFileMimeType)
	coverFileMimeType?: null | string

	@DtoFieldDecorators('isCoverFileUploaded', bdConfig.Video.dbFields.is_cover_file_uploaded, {
		required: false,
	})
	isCoverFileUploaded?: boolean
}
