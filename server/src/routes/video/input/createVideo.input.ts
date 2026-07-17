import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateVideoInput {
	@DtoFieldDecorators('videoCollectionId', bdConfig.Video.dbFields.video_collection_id)
	videoCollectionId: number

	@DtoFieldDecorators('name', bdConfig.Video.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('originalContent', bdConfig.Video.dbFields.original_content)
	originalContent?: null | string

	@DtoFieldDecorators('fileSizeMb', bdConfig.Video.dbFields.file_size_mb, {
		required: false,
	})
	fileSizeMb?: number

	@DtoFieldDecorators('fileDurationSec', bdConfig.Video.dbFields.file_duration_sec, {
		required: false,
	})
	fileDurationSec?: number

	@DtoFieldDecorators('languageCode', bdConfig.VideoCollection.dbFields.source_language_code)
	languageCode: Language
}
