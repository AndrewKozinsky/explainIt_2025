import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'

const $ = bdConfig.UniversalPhraseTranslation.dbFields

export class UniversalPhraseTranslationWordFormsOutModel {
	@ApiProperty({
		description: 'Forms of the word in order, for example bring, brought, brought. Variants are joined by a slash',
		type: [String],
	})
	forms: string[]
}

export class UniversalPhraseTranslationOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.UniversalPhrase.dbFields.id))
	universalPhraseId: number

	@ApiProperty(getApiPropertyOptions($.target_language_code))
	targetLanguageCode: string

	@ApiProperty({
		description: 'Main part of the article — array of typed blocks',
		type: 'object',
		additionalProperties: true,
		nullable: true,
	})
	translation: null | object

	@ApiProperty({
		description: 'Optional article sections generated in the background — array of typed blocks',
		type: 'object',
		additionalProperties: true,
		nullable: true,
	})
	deepSections: null | object

	@ApiProperty({ description: 'Prepared word forms shown above the article', type: [UniversalPhraseTranslationWordFormsOutModel] })
	wordForms: UniversalPhraseTranslationWordFormsOutModel[]

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
