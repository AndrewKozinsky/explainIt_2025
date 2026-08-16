import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { paginationFields } from 'db/dbConfig/pagination'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SavedYoutubeVideosPageOutModel } from 'models/video/savedYoutubeVideosPage.out.model'
import { VideoOutModel } from 'models/video/video.out.model'
import { YoutubeVideosOutModel } from 'models/youtube/youtubeVideo.out.model'

export function ApiGetYoutubeTopics() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get the list of video topic categories',
			description:
				'Returns the fixed list of topic categories used for classifying YouTube videos. ' +
				'These are the same topics returned by the video metadata analysis.',
		}),
		ApiResponse({
			status: 200,
			description: 'List of video topic categories',
			schema: {
				type: 'array',
				items: { type: 'string' },
				example: ['Travel & Geography', 'Technology & Science', 'Language Learning'],
			},
		}),
	)
}

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

export function ApiGetYoutubeSearch() {
	return applyDecorators(
		ApiOperation({
			summary: 'Search YouTube videos via YouTube Data API',
			description:
				'Returns a paginated list of YouTube videos from YouTube Data API. ' +
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

export function ApiGetSavedYoutubeVideos() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get saved YouTube videos with filters',
			description:
				'Returns a paginated list of saved YouTube videos from the database, filtered by duration, proficiency level, and topic. ' +
				'Optionally sorted by creation date or learnability score via sortBy and sortDirection. ' +
				'Paginated via page (1-based) and pageSize (default 20, max 100).',
		}),
		ApiQuery({
			name: 'maxDurationSec',
			...getApiPropertyOptions(bdConfig.Video.dbFields.duration_sec),
			required: false,
		}),
		ApiQuery({
			name: 'minDurationSec',
			...getApiPropertyOptions(bdConfig.Video.dbFields.duration_sec),
			required: false,
		}),
		ApiQuery({
			name: 'proficiencyLevel',
			...getApiPropertyOptions(bdConfig.Video.dbFields.proficiency_level),
		}),
		ApiQuery({
			name: 'topic',
			...getApiPropertyOptions(bdConfig.Video.dbFields.topic),
		}),
		ApiQuery({
			name: 'languageCode',
			...getApiPropertyOptions(bdConfig.Video.dbFields.source_language_code),
			required: false,
		}),
		ApiQuery({
			name: 'sortBy',
			...getApiPropertyOptions(bdConfig.Video.dtoProps.sortBy),
		}),
		ApiQuery({
			name: 'sortDirection',
			...getApiPropertyOptions(bdConfig.Video.dtoProps.sortDirection),
		}),
		ApiQuery({
			name: 'page',
			...getApiPropertyOptions(paginationFields.page),
		}),
		ApiQuery({
			name: 'pageSize',
			...getApiPropertyOptions(paginationFields.pageSize),
		}),
		ApiResponse({ status: 200, description: 'OK', type: SavedYoutubeVideosPageOutModel }),
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
