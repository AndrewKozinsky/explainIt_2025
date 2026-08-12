import { mapToVideoLite, mapVideoOutModelToVideoModel } from '@/entities/video/lib/mappers'
import type { VideoLiteModel, VideoModel } from '@/entities/video/lib/types'
import type {
	VideoLiteOutModel,
	YoutubeControllerGetSavedVideosParams as OrvalGetSavedVideosParams,
	YoutubeControllerGetYouTubeVideosParams as OrvalSearchVideosParams,
	YoutubeVideoOutModel,
	YoutubeVideosOutModel,
} from '@/shared/api/generated/models'
import {
	// 	youtubeControllerCreateVideo,
	youtubeControllerGetSavedVideos,
	// 	youtubeControllerGetVideoById,
	youtubeControllerGetVideoTopics,
	youtubeControllerGetYouTubeVideos,
} from '@/shared/api/generated/you-tube/you-tube'
import { extractString } from '@/shared/utils/extractors'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { formatDurationSec } from '@/shared/utils/time'
import type {
	GetSavedYoutubeVideosParams,
	GetYoutubeVideosParams,
	YoutubeVideoModel,
	YoutubeVideosResultModel,
	YoutubeRepository,
} from './YoutubeRepository'

/**
 * Реализация YoutubeRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 */
export class YoutubeApi implements YoutubeRepository {
	async searchYouTubeVideos(params: GetYoutubeVideosParams): Promise<ApiResult<YoutubeVideosResultModel>> {
		return executeApiCall(
			() => youtubeControllerGetYouTubeVideos(params as OrvalSearchVideosParams),
			(data) => mapToYoutubeVideosResult(data),
		)
	}

	/*async getVideoById(videoId: string) {
		return executeApiCall(
			() => youtubeControllerGetVideoById(videoId),
			(data) => (data ? mapVideoOutModelToVideoModel(data) : null),
		)
	}*/

	/*async getOrCreateYouTubeVideo(videoId: string): Promise<ApiResult<VideoModel>> {
		return executeApiCall(
			() => youtubeControllerCreateVideo(videoId),
			(data) => mapVideoOutModelToVideoModel(data),
		)
	}*/

	async getSavedVideos(params?: GetSavedYoutubeVideosParams): Promise<ApiResult<VideoLiteModel[]>> {
		return executeApiCall(
			() => youtubeControllerGetSavedVideos(params as OrvalGetSavedVideosParams),
			(data: VideoLiteOutModel[]) => data.map(mapToVideoLite),
		)
	}

	async getVideoTopics(): Promise<ApiResult<string[]>> {
		return executeApiCall(
			() => youtubeControllerGetVideoTopics(),
			(data: string[]) => data,
		)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapToYoutubeVideosResult(raw: YoutubeVideosOutModel): YoutubeVideosResultModel {
	return {
		videos: raw.videos.map(mapToYoutubeVideo),
		nextPageToken: extractString(raw.nextPageToken),
		totalResults: raw.totalResults,
	}
}

function mapToYoutubeVideo(raw: YoutubeVideoOutModel): YoutubeVideoModel {
	return {
		videoId: raw.videoId,
		title: raw.title,
		channelName: raw.channelName,
		channelLogoUrl: extractString(raw.channelLogoUrl),
		thumbnailUrl: raw.thumbnailUrl,
		viewCount: raw.viewCount,
		duration: formatDurationSec(raw.durationSec),
		durationSeconds: raw.durationSec,
	}
}
