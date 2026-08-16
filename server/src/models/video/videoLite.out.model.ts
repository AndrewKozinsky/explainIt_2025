import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.Video.dbFields
const $$ = bdConfig.Video.dtoProps

export class VideoLiteOutModel {
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
	originalContent: null | string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: null | string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions($.file_name))
	fileName: null | string

	@ApiProperty(getApiPropertyOptions($.file_s3_key))
	fileS3Key: null | string

	@ApiProperty({ description: 'Pre-signed URL for downloading the video file from S3', example: 'https://...' })
	fileUrl: null | string

	@ApiProperty(getApiPropertyOptions($.is_file_uploaded))
	isFileUploaded: boolean

	@ApiProperty(getApiPropertyOptions($.file_size_mb))
	fileSizeMb: number

	@ApiProperty(getApiPropertyOptions($.duration_sec))
	durationSec: number

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
