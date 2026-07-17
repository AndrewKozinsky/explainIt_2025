import { ApiProperty } from '@nestjs/swagger'
import { SubtitlesGenerationStatus } from 'prisma/generated/client'

export class VideoSubtitlesStatusOutModel {
	@ApiProperty({ description: 'Video ID', example: 1 })
	videoId: number

	@ApiProperty({
		description: 'Current status of subtitles generation',
		enum: ['idle', 'pending', 'processing', 'done', 'failed'],
		example: 'pending',
	})
	status: SubtitlesGenerationStatus

	@ApiProperty({ description: 'Error message if generation failed', example: null, nullable: true })
	error: null | string

	@ApiProperty({
		description: 'ISO timestamp when generation started',
		example: '2024-01-01T00:00:00.000Z',
		nullable: true,
	})
	startedAt: null | string

	@ApiProperty({ description: 'BullMQ job ID of the generation task', example: 'abc123', nullable: true })
	jobId: null | string
}
