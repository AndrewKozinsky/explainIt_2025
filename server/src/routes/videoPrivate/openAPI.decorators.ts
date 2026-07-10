import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CreateVideoPrivateOutModel } from 'models/videoPrivate/createVideoPrivate.out.model'
import { UpdateVideoPrivateOutModel } from 'models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivateOut.model'
import { VideoPrivateSubtitlesStatusOutModel } from 'models/videoPrivate/videoPrivateSubtitlesStatus.out.model'
import { CreateVideoDto } from './dto/create-video.dto'
import { UpdateVideoDto } from './dto/update-video.dto'

export function ApiCreateVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create private video',
			description:
				'Creates a new private video for the authenticated user. If the content is provided as SRT subtitles, they will be parsed and saved automatically.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateVideoDto }),
		ApiResponse({ status: 201, description: 'Created', type: CreateVideoPrivateOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.video.notCreated.errorMessageCode,
				errorMessage.unknownDbError.errorMessageCode,
			].join(' | '),
		}),
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
		ApiBody({ type: UpdateVideoDto }),
		ApiResponse({ status: 200, description: 'OK', type: UpdateVideoPrivateOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.video.notFound.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.video.notCreated.errorMessageCode,
				errorMessage.unknownDbError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiGetUserVideos() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get user private videos',
			description: 'Returns all private videos belonging to the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: [VideoPrivateLiteOutModel] }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiGetVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get private video',
			description:
				'Returns a single private video by ID with full details including sentences, subtitles, and their mappings. Only accessible by the video owner.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: VideoPrivateOutModel }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.video.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiGenerateSubtitles() {
	return applyDecorators(
		ApiOperation({
			summary: 'Generate subtitles for private video',
			description:
				'Starts automatic subtitles generation for an uploaded video file. Requires the video to have an uploaded file with language and duration set. The operation is paid — the user must have sufficient balance.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: VideoPrivateSubtitlesStatusOutModel }),
		ApiResponse({
			status: 400,
			description: [
				errorMessage.video.subtitlesGenerationAlreadyRunning.errorMessageCode,
				errorMessage.video.subtitlesGenerationFileNotUploaded.errorMessageCode,
				errorMessage.video.subtitlesGenerationLanguageRequired.errorMessageCode,
				errorMessage.video.subtitlesGenerationDurationRequired.errorMessageCode,
			].join(' | '),
		}),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 402, description: errorMessage.userBalanceBelowMinimum.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.video.notFound.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.video.subtitlesGenerationFailed.errorMessageCode,
				errorMessage.unknownDbError.errorMessageCode,
			].join(' | '),
		}),
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
		ApiResponse({ status: 200, description: 'OK', type: VideoPrivateSubtitlesStatusOutModel }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.video.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
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
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.video.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownError.errorMessageCode }),
	)
}
