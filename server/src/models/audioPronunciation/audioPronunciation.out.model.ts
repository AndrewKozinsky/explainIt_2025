import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.UniversalAudioPronunciation.dbFields
const $$ = bdConfig.UniversalAudioPronunciation.dtoProps

export class UniversalAudioPronunciationOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.UniversalPhrase.dbFields.id))
	universalPhraseId: number

	@ApiProperty(getApiPropertyOptions($$.audioUrl))
	audioUrl: string
}
