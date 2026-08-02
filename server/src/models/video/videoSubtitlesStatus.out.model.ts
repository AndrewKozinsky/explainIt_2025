import { ApiProperty } from '@nestjs/swagger'
import { SubtitlesSource, SubtitlesStatus } from 'prisma/generated/client'

export class VideoSubtitlesStatusOutModel {
	@ApiProperty({ description: 'Video ID', example: 1 })
	videoId: number

	@ApiProperty({
		description: 'Who created the subtitles',
		enum: ['user', 'youTube', 'llm'],
		example: 'user',
	})
	source: SubtitlesSource

	@ApiProperty({
		description: 'Current status of subtitles processing',
		enum: ['idle', 'pending', 'processing', 'done', 'failed'],
		example: 'pending',
	})
	status: SubtitlesStatus

	@ApiProperty({ description: 'Machine-readable error code if processing failed', example: null, nullable: true })
	errorCode: null | string

	@ApiProperty({ description: 'BullMQ job ID of the subtitles task', example: 'abc123', nullable: true })
	jobId: null | string
}
