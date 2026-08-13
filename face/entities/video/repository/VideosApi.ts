import type {
	CreateVideoOutModel,
	UpdateVideoOutModel,
	VideoSubtitlesStatusOutModel,
	CreateVideoInput as OrvalCreateVideoInput,
	UpdateVideoInput as OrvalUpdateVideoInput,
} from '@/shared/api/generated/models'
import {
	videoControllerGetVideos,
	videoControllerGetVideo,
	videoControllerCreateVideo,
	videoControllerUpdateVideo,
	videoControllerDeleteVideo,
	videoControllerGenerateSubtitles,
	videoControllerGetSubtitlesStatus,
} from '@/shared/api/generated/video/video'
import { extractString, extractNumber, extractBoolean } from '@/shared/utils/extractors'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'
import {
	mapType,
	mapContentType,
	mapSubtitlesSource,
	mapProficiencyLevel,
	mapToVideoLite,
	mapVideoOutModelToVideoModel,
} from '../lib/mappers'
import type { VideosRepository, CreateVideoInput, UpdateVideoInput } from './VideosRepository'
import type { VideoLiteModel, VideoModel, SubtitlesStatusModel } from '../lib/types'
import type { SubtitlesStatusModelType } from '../lib/types'

/**
 * Реализация VideosRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 */
export class VideosApi implements VideosRepository {
	async getVideos(): Promise<ApiResult<VideoLiteModel[]>> {
		return executeApiCall(
			() => videoControllerGetVideos(),
			(data) => data.map(mapToVideoLite),
		)
	}

	async getVideo(id: number): Promise<ApiResult<VideoModel>> {
		return executeApiCall(
			() => videoControllerGetVideo(id),
			(data) => mapVideoOutModelToVideoModel(data),
		)
	}

	async createVideo(input: CreateVideoInput): Promise<ApiResult<VideoLiteModel>> {
		return executeApiCall(
			() => videoControllerCreateVideo(input as unknown as OrvalCreateVideoInput),
			(data) => mapCreateVideoOutToVideoLite(data),
		)
	}

	async updateVideo(id: number, input: UpdateVideoInput): Promise<ApiResult<VideoLiteModel>> {
		return executeApiCall(
			() => videoControllerUpdateVideo(id, input as unknown as OrvalUpdateVideoInput),
			(data) => mapUpdateVideoOutToVideoLite(data),
		)
	}

	async deleteVideo(id: number): Promise<ApiResult<void>> {
		return executeApiCall(() => videoControllerDeleteVideo(id))
	}

	async generateSubtitles(id: number): Promise<ApiResult<SubtitlesStatusModel>> {
		return executeApiCall(
			() => videoControllerGenerateSubtitles(id),
			(data) => mapToSubtitlesStatus(data),
		)
	}

	async getSubtitlesStatus(id: number): Promise<ApiResult<SubtitlesStatusModel>> {
		return executeApiCall(
			() => videoControllerGetSubtitlesStatus(id),
			(data) => mapToSubtitlesStatus(data),
		)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapCreateVideoOutToVideoLite(raw: CreateVideoOutModel): VideoLiteModel {
	return {
		id: raw.id,
		type: mapType(raw.type),
		name: extractString(raw.name),
		languageCode: extractString(raw.languageCode) as LanguageCode,
		proficiencyLevel: mapProficiencyLevel((raw as unknown as Record<string, unknown>).proficiencyLevel),
		youtubeVideoId: null,
		about: null,
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
		contentType: mapContentType(raw.contentType),
		fileName: null,
		fileS3Key: null,
		fileUrl: null,
		isFileUploaded: null,
		fileSizeMb: null,
		topic: null,
		duration: null,
		durationSeconds: 0,
		userId: extractNumber(raw.userId),
		coverFileName: null,
		coverFileS3Key: null,
		isCoverFileUploaded: false,
		coverUrl: null,
		uploadCoverUrl: null,
		subtitlesSource: null,
		subtitlesStatus: 'idle',
		subtitlesErrorCode: null,
		ratio: null,
	}
}

function mapUpdateVideoOutToVideoLite(raw: UpdateVideoOutModel): VideoLiteModel {
	return {
		id: raw.id,
		type: 'private',
		name: extractString(raw.name),
		languageCode: extractString(raw.languageCode) as LanguageCode,
		proficiencyLevel: mapProficiencyLevel((raw as unknown as Record<string, unknown>).proficiencyLevel),
		youtubeVideoId: null,
		about: null,
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
		contentType: mapContentType(raw.contentType),
		fileName: null,
		fileS3Key: null,
		fileUrl: extractString(raw.uploadUrl),
		isFileUploaded: null,
		fileSizeMb: extractNumber(raw.fileSizeMb),
		duration: null,
		durationSeconds: extractNumber(raw.durationSec)!,
		topic: raw.topic,
		userId: extractNumber(raw.userId),
		coverFileName: null,
		coverFileS3Key: null,
		isCoverFileUploaded: false,
		coverUrl: null,
		uploadCoverUrl: extractString(raw.uploadCoverUrl),
		subtitlesSource: null,
		subtitlesStatus: 'idle',
		subtitlesErrorCode: null,
		ratio: null,
	}
}

function mapToSubtitlesStatus(raw: VideoSubtitlesStatusOutModel): SubtitlesStatusModel {
	return {
		videoId: raw.videoId,
		source: mapSubtitlesSource(extractString(raw.source)),
		status: extractString(raw.status) as SubtitlesStatusModelType,
		errorCode: extractString(raw.errorCode),
		jobId: extractString(raw.jobId),
	}
}
