import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.UniversalTranscription.dbFields

export class TranscriptionOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.UniversalPhrase.dbFields.id))
	universalPhraseId: number

	@ApiProperty(getApiPropertyOptions($.ipa))
	ipa: string | null

	@ApiProperty(getApiPropertyOptions($.pinyin))
	pinyin: string | null
}
