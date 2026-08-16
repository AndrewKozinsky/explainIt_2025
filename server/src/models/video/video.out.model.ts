import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'

const $ = bdConfig.Video.dbFields
const $$ = bdConfig.Video.dtoProps
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

	@ApiProperty(getApiPropertyOptions($.type))
	type: 'public' | 'private'

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.id))
	userId: null | number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: string

	@ApiProperty(getApiPropertyOptions($.proficiency_level))
	proficiencyLevel: null | number

	@ApiProperty(getApiPropertyOptions($.youtube_video_id))
	youtubeVideoId: null | string

	@ApiProperty(getApiPropertyOptions($.about))
	about: string | null

	@ApiProperty(getApiPropertyOptions($.topic))
	topic: string | null

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

	@ApiProperty(getApiPropertyOptions($.duration_sec))
	durationSec: number

	@ApiProperty({
		description: 'Aspect ratio in CSS format, e.g. "1280 / 720". Only for YouTube videos.',
		example: '1280 / 720',
		required: false,
	})
	ratio?: string

	@ApiProperty(getApiPropertyOptions($.cover_file_name))
	coverFileName: string | null

	@ApiProperty(getApiPropertyOptions($.cover_file_s3_key))
	coverFileS3Key: string | null

	@ApiProperty(getApiPropertyOptions($.is_cover_file_uploaded))
	isCoverFileUploaded: boolean

	@ApiProperty(getApiPropertyOptions($$.coverUrl))
	coverUrl: string | null

	@ApiProperty(getApiPropertyOptions($$.uploadCoverUrl))
	uploadCoverUrl: string | null

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

	@ApiProperty({
		description: 'Who created the subtitles: user-uploaded, from YouTube, or LLM-generated',
		example: 'user',
	})
	subtitlesSource: string

	@ApiProperty({
		description: 'Status of subtitles processing',
		enum: ['idle', 'pending', 'processing', 'done', 'failed'],
		example: 'done',
	})
	subtitlesStatus: string

	@ApiProperty({ description: 'Error code if subtitles processing failed', example: null, nullable: true })
	subtitlesErrorCode: null | string
}
