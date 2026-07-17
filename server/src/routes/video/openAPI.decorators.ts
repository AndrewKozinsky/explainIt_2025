import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { CreateVideoInput } from 'routes/video/input/createVideo.input'
import { UpdateVideoInput } from 'routes/video/input/updateVideo.input'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CreateVideoOutModel } from 'models/video/createVideo.out.model'
import { UpdateVideoOutModel } from 'models/video/updateVideo.out.model'
import { VideoOutModel } from 'models/video/video.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'
import { VideoSubtitlesStatusOutModel } from 'models/video/videoSubtitlesStatus.out.model'

export function ApiCreateVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create private video',
			description:
				'Creates a new private video for the authenticated user. If the content is provided as SRT subtitles, they will be parsed and saved automatically.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateVideoInput }),
		ApiResponse({ status: 201, description: 'Created', type: CreateVideoOutModel }),
	)
}

export function ApiUpdateVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Update private video',
			description:
				'Updates a private video owned by the authenticated user. Can update name, language, content, and file-related fields.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiBody({ type: UpdateVideoInput }),
		ApiResponse({ status: 200, description: 'OK', type: UpdateVideoOutModel }),
	)
}

export function ApiGetVideos() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get all videos',
			description: 'Returns all public videos. If the user is authenticated, also includes their private videos.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [VideoLiteOutModel] }),
	)
}

export function ApiGetVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get video by ID',
			description:
				'Returns a single video by ID with full details. Public videos are accessible to everyone. Private videos are only accessible by their owner.',
		}),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: VideoOutModel }),
	)
}

export function ApiGenerateSubtitles() {
	return applyDecorators(
		ApiOperation({
			summary: 'Generate subtitles for private video',
			description:
				'Starts automatic subtitles generation for an uploaded video file. Requires the video to have an uploaded file with language and duration set.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: VideoSubtitlesStatusOutModel }),
	)
}

export function ApiGetSubtitlesStatus() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get subtitles generation status',
			description:
				'Returns the current status of subtitles generation for a private video. Poll this endpoint to track progress after starting generation.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: VideoSubtitlesStatusOutModel }),
	)
}

export function ApiDeleteVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Delete private video',
			description:
				'Deletes a private video owned by the authenticated user. Also deletes the associated file from S3 if one was uploaded.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK' }),
	)
}
