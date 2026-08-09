import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/client'

export class GetSavedYoutubeVideosInput {
	@DtoFieldDecorators('maxDurationSec', bdConfig.Video.dbFields.duration_sec, {
		required: false,
	})
	maxDurationSec?: number

	@DtoFieldDecorators('minDurationSec', bdConfig.Video.dbFields.duration_sec, {
		required: false,
	})
	minDurationSec?: number

	@DtoFieldDecorators('proficiencyLevel', bdConfig.Video.dbFields.proficiency_level)
	proficiencyLevel?: number

	@DtoFieldDecorators('topic', bdConfig.Video.dbFields.topic)
	topic?: string

	@DtoFieldDecorators('languageCode', bdConfig.Video.dbFields.source_language_code, {
		required: false,
	})
	languageCode?: LanguageCode
}
