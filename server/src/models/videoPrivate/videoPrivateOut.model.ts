import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'

const $ = bdConfig.VideoPrivate.dbFields

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

export class VideoPrivateSubtitleOutModel {
	@ApiProperty({ description: 'Subtitle ID', example: 1 })
	id: number

	@ApiProperty({ description: 'Start time in milliseconds', example: 0 })
	startTimeMs: number

	@ApiProperty({ description: 'End time in milliseconds', example: 5000 })
	endTimeMs: number

	@ApiProperty({ description: 'Start offset in the processed content', example: 0 })
	startOffset: number

	@ApiProperty({ description: 'Length of the subtitle text', example: 50 })
	length: number

	@ApiProperty({ description: 'Order index of the subtitle', example: 1 })
	orderIndex: number
}

export class SentenceTranslationLiteOutModel {
	@ApiProperty({ description: 'Translation ID', example: 1 })
	id: number

	@ApiProperty({ description: 'Translated text', example: 'Hello' })
	translation: string
}

export class VideoPrivateSentenceOutModel {
	@ApiProperty({ description: 'Sentence ID', example: 1 })
	id: number

	@ApiProperty({ description: 'Sentence translations', type: [SentenceTranslationLiteOutModel], nullable: true })
	sentenceTranslations: SentenceTranslationLiteOutModel[] | null

	@ApiProperty({ description: 'Start offset in the processed content', example: 0 })
	startOffset: number

	@ApiProperty({ description: 'Length of the sentence text', example: 30 })
	length: number

	@ApiProperty({ description: 'Order index of the sentence', example: 1 })
	orderIndex: number

	@ApiProperty({
		description: 'Phrase translations within this sentence',
		type: [SentencePhraseTranslationOutModel],
		nullable: true,
	})
	sentencePhraseTranslations: SentencePhraseTranslationOutModel[] | null
}

export class VideoPrivateOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty({ description: 'User ID', example: 1 })
	userId: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions($.year))
	year: number | null

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: null | string

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
		type: [VideoPrivateSentenceOutModel],
		nullable: true,
	})
	sentences: VideoPrivateSentenceOutModel[] | null

	@ApiProperty({
		description: 'Subtitles parsed from the video content',
		type: [VideoPrivateSubtitleOutModel],
		nullable: true,
	})
	subtitles: VideoPrivateSubtitleOutModel[] | null

	@ApiProperty({
		description: 'Mapping between subtitles and sentences',
		type: [SubtitleSentenceInitOutModel],
		nullable: true,
	})
	subtitleSentenceInit: SubtitleSentenceInitOutModel[] | null
}
