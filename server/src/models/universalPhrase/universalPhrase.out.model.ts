import { ApiProperty } from '@nestjs/swagger'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { TranscriptionOutModel } from '../transcription/transcription.out.model'

const $ = bdConfig.UniversalPhrase.dbFields

export class UniversalPhraseOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.text))
	text: string

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	sourceLanguageCode: Language

	@ApiProperty({ description: 'Transcription data', type: TranscriptionOutModel, nullable: true })
	transcription: TranscriptionOutModel | null

	@ApiProperty({
		description: 'Audio pronunciation data',
		type: UniversalAudioPronunciationOutModel,
		nullable: true,
	})
	audioPronunciation: UniversalAudioPronunciationOutModel | null
}
