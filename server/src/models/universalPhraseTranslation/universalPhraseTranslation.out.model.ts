import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'

const $ = bdConfig.UniversalPhraseTranslation.dbFields

export class UniversalPhraseTranslationOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.UniversalPhrase.dbFields.id))
	universalPhraseId: number

	@ApiProperty(getApiPropertyOptions($.target_language_code))
	targetLanguageCode: string

	@ApiProperty({
		description: 'Translation result from LLM — array of typed blocks',
		type: 'object',
		additionalProperties: true,
		nullable: true,
	})
	translation: null | object

	@ApiProperty(getApiPropertyOptions($.status))
	status: string

	@ApiProperty(getApiPropertyOptions($.error_code))
	errorCode: null | string

	@ApiProperty(getApiPropertyOptions($.non_existent_word))
	nonExistentWord: boolean

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string

	@ApiProperty({ description: 'Transcription of the source phrase', type: TranscriptionOutModel, nullable: true })
	transcription: TranscriptionOutModel | null
}
