import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { VideoOutModel } from 'models/video/video.out.model'
import { YoutubeVideosOutModel } from 'models/youtube/youtubeVideo.out.model'

export function ApiGetYoutubeVideoById() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get a saved YouTube video by ID',
			description:
				'Returns video data with subtitles and sentences if the video has been saved to the database. ' +
				'Returns null if the video has not been saved yet (use POST to create it).',
		}),
		ApiParam({
			name: 'videoId',
			required: true,
			description: 'YouTube video ID',
			example: 'dQw4w9WgXcQ',
		}),
		ApiResponse({
			status: 200,
			description: 'Returns the saved video or null if not saved yet',
			type: VideoOutModel,
			nullable: true,
		}),
	)
}

export function ApiGetYoutubeVideos() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get YouTube videos',
			description:
				'Returns a paginated list of YouTube videos. ' +
				'Use nextPageToken from the response to fetch the next page. ' +
				'The limit parameter controls how many videos are returned per page (1–50).',
		}),
		ApiQuery({
			name: 'limit',
			required: false,
			description: 'Maximum number of videos per page (1–50, default 20)',
			example: 20,
		}),
		ApiQuery({
			name: 'pageToken',
			required: false,
			description: 'Token for the next page of results. Omit for the first page.',
			example: 'CAUQAA',
		}),
		ApiResponse({ status: 200, description: 'OK', type: YoutubeVideosOutModel }),
	)
}

export function ApiCreateYoutubeVideo() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create a YouTube video in the database',
			description:
				'Saves a YouTube video to the database so that subtitles, sentences, and translations can be associated with it. ' +
				'The video language is determined automatically from YouTube metadata. ' +
				'If the video already exists, it is returned as-is.',
		}),
		ApiParam({
			name: 'videoId',
			required: true,
			description: 'YouTube video ID',
			example: 'dQw4w9WgXcQ',
		}),
		ApiResponse({ status: 201, description: 'Created', type: VideoOutModel }),
	)
}
