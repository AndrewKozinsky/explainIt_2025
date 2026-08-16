import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateVideoInput {
	@DtoFieldDecorators('name', bdConfig.Video.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('originalContent', bdConfig.Video.dbFields.original_content)
	originalContent?: null | string

	@DtoFieldDecorators('fileSizeMb', bdConfig.Video.dbFields.file_size_mb, {
		required: false,
	})
	fileSizeMb?: number

	@DtoFieldDecorators('durationSec', bdConfig.Video.dbFields.duration_sec)
	durationSec: number

	@DtoFieldDecorators('languageCode', bdConfig.Video.dbFields.source_language_code)
	languageCode: Language
}
