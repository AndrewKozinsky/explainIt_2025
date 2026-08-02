import { mapVideoOutModelToVideoModel } from '@/entites/videoBase/repository/BaseVideosApi'
import type { VideoModel } from '@/entites/videoBase/repository/BaseVideosRepository'
import type { YoutubeVideosOutModel, YoutubeVideoOutModel } from '@/shared/api/generated/models'
import type { YoutubeControllerGetVideosParams as OrvalGetVideosParams } from '@/shared/api/generated/models'
import {
	youtubeControllerCreateVideo,
	youtubeControllerGetVideoById,
	youtubeControllerGetVideos,
} from '@/shared/api/generated/you-tube/you-tube'
import { extractString } from '@/shared/utils/extractors'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
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
	async getVideos(params: GetYoutubeVideosParams): Promise<ApiResult<YoutubeVideosResultModel>> {
		return executeApiCall(
			() => youtubeControllerGetVideos(params as OrvalGetVideosParams),
			(data) => mapToYoutubeVideosResult(data),
		)
	}

	async getVideoById(videoId: string) {
		return executeApiCall(
			() => youtubeControllerGetVideoById(videoId),
			(data) => (data ? mapVideoOutModelToVideoModel(data) : null),
		)
	}

	async getOrCreateVideo(videoId: string): Promise<ApiResult<VideoModel>> {
		return executeApiCall(
			() => youtubeControllerCreateVideo(videoId),
			(data) => mapVideoOutModelToVideoModel(data),
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
		duration: raw.duration,
	}
}
