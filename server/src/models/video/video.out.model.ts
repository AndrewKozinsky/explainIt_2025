import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'

const $ = bdConfig.Video.dbFields
const sentence$ = bdConfig.Sentence.dbFields
const subtitle$ = bdConfig.Subtitle.dbFields

export class SubtitleSentenceInitOutModel {
	@ApiProperty({ description: 'Subtitle sentence init ID', example: 1 })
	id: number

	@ApiProperty({ description: 'Subtitle ID', example: 1 })
	subtitleId: number

	@ApiProperty({ description: 'Sentence ID', example: 1 })
	sentenceId: number

	@ApiProperty({ description: 'Start offset in the processed content', example: 0 })
	startOffset: number

	@ApiProperty({ description: 'Length of the text segment', example: 100 })
	length: number
}

export class VideoSubtitleOutModel {
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

export class SentenceTranslationLiteOutModel {
	@ApiProperty({ description: 'Translation ID', example: 1 })
	id: number

	@ApiProperty({ description: 'Translated text', example: 'Hello' })
	translation: string
}

export class VideoSentenceOutModel {
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
		description: 'Phrase translations within this sentence',
		type: [SentencePhraseTranslationOutModel],
		nullable: true,
	})
	sentencePhraseTranslations: SentencePhraseTranslationOutModel[] | null
}

export class VideoOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dbFields.id))
	videoCollectionId: number

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dbFields.type))
	type: 'public' | 'private'

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.id))
	userId: null | number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty({ description: 'Language code of the video', example: 'en', nullable: true })
	languageCode: null | string

	@ApiProperty(getApiPropertyOptions($.note))
	note: string | null

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: string | null

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: string | null

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions($.file_name))
	fileName: string | null

	@ApiProperty(getApiPropertyOptions($.file_s3_key))
	fileS3Key: string | null

	@ApiProperty({ description: 'Pre-signed URL for downloading the video file from S3', example: 'https://...' })
	fileUrl: string | null

	@ApiProperty(getApiPropertyOptions($.is_file_uploaded))
	isFileUploaded: boolean

	@ApiProperty(getApiPropertyOptions($.file_size_mb))
	fileSizeMb: number

	@ApiProperty(getApiPropertyOptions($.file_duration_sec))
	fileDurationSec: null | number

	@ApiProperty({
		description: 'Sentences extracted from the video content',
		type: [VideoSentenceOutModel],
		nullable: true,
	})
	sentences: VideoSentenceOutModel[] | null

	@ApiProperty({
		description: 'Subtitles parsed from the video content',
		type: [VideoSubtitleOutModel],
		nullable: true,
	})
	subtitles: VideoSubtitleOutModel[] | null

	@ApiProperty({
		description: 'Mapping between subtitles and sentences',
		type: [SubtitleSentenceInitOutModel],
		nullable: true,
	})
	subtitleSentenceInit: SubtitleSentenceInitOutModel[] | null
}
