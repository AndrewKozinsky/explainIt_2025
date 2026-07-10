import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'
import {
	SentenceTranslationLiteOutModel,
	SubtitleSentenceInitOutModel,
} from 'models/videoPrivate/videoPrivateOut.model'

const $ = bdConfig.VideoPublic.dbFields
const $$ = bdConfig.VideoPublic.dtoProps
const sentence$ = bdConfig.Sentence.dbFields
const subtitle$ = bdConfig.Subtitle.dbFields

export class VideoPublicSentenceOutModel {
	@ApiProperty(getApiPropertyOptions(sentence$.id))
	id: number

	@ApiProperty({ description: 'Sentence translations', type: [SentenceTranslationLiteOutModel], nullable: true })
	sentenceTranslations: SentenceTranslationLiteOutModel[] | null

	@ApiProperty(getApiPropertyOptions(sentence$.start_offset))
	startOffset: number

	@ApiProperty(getApiPropertyOptions(sentence$.length))
	length: number

	@ApiProperty(getApiPropertyOptions(sentence$.order_index))
	orderIndex: number

	@ApiProperty({
		description: 'Sentence phrase translations',
		type: [SentencePhraseTranslationOutModel],
		nullable: true,
	})
	sentencePhraseTranslations: SentencePhraseTranslationOutModel[] | null
}

export class VideoPublicSubtitleOutModel {
	@ApiProperty(getApiPropertyOptions(subtitle$.id))
	id: number

	@ApiProperty(getApiPropertyOptions(subtitle$.start_time_ms))
	startTimeMs: number

	@ApiProperty(getApiPropertyOptions(subtitle$.end_time_ms))
	endTimeMs: number

	@ApiProperty(getApiPropertyOptions(subtitle$.start_offset))
	startOffset: number

	@ApiProperty(getApiPropertyOptions(subtitle$.length))
	length: number

	@ApiProperty(getApiPropertyOptions(subtitle$.order_index))
	orderIndex: number
}

export class VideoPublicOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string

	@ApiProperty(getApiPropertyOptions($.year))
	year: number

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: string

	@ApiProperty(getApiPropertyOptions($.note))
	note: string

	@ApiProperty(getApiPropertyOptions($.covers))
	covers: string[]

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions($.file_name))
	fileName: string

	@ApiProperty(getApiPropertyOptions($.file_s3_key))
	fileS3Key: string

	@ApiProperty(getApiPropertyOptions($$.fileUrl))
	fileUrl: string

	@ApiProperty({ description: 'Sentences of the video', type: [VideoPublicSentenceOutModel], nullable: true })
	sentences: VideoPublicSentenceOutModel[] | null

	@ApiProperty({ description: 'Subtitles of the video', type: [VideoPublicSubtitleOutModel], nullable: true })
	subtitles: VideoPublicSubtitleOutModel[] | null

	@ApiProperty({
		description: 'Subtitle sentence init mappings',
		type: [SubtitleSentenceInitOutModel],
		nullable: true,
	})
	subtitleSentenceInit: SubtitleSentenceInitOutModel[] | null
}
