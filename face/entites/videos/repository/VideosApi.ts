import type {
	VideoLiteOutModel,
	VideoOutModel,
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
import type {
	VideoLite,
	Video,
	SubtitlesStatus,
	VideosRepository,
	CreateVideoInput,
	UpdateVideoInput,
} from './VideosRepository'

/**
 * Реализация VideosRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 *
 * ## Обработка ошибок
 *
 * Методы НЕ содержат try/catch. Вместо этого они полагаются на цепочку:
 *
 * ```
 * Сервер (ошибка)
 *   → GlobalExceptionFilter формирует JSON с errorMessageCode
 *   → customMutator видит !res.ok и выбрасывает ApiError
 *   → метод НЕ ловит — ошибка прокидывается наверх
 *   → useFetchData / useAsyncMutation ловит в try/catch
 *   → resolveError извлекает errorMessageCode → читаемый текст
 *   → Компонент получает { error: "Видео не найдено." }
 * ```
 */
export class VideosApi implements VideosRepository {
	async getVideos(): Promise<VideoLite[]> {
		const response = await videoControllerGetVideos()

		return response.data.map(mapToVideoLite)
	}

	async getVideo(id: number): Promise<Video> {
		const response = await videoControllerGetVideo(id)

		return mapToVideo(response.data)
	}

	async createVideo(input: CreateVideoInput): Promise<VideoLite> {
		const response = await videoControllerCreateVideo(input as unknown as OrvalCreateVideoInput)

		return mapCreateVideoOutToVideoLite(response.data)
	}

	async updateVideo(id: number, input: UpdateVideoInput): Promise<VideoLite> {
		const response = await videoControllerUpdateVideo(id, input as unknown as OrvalUpdateVideoInput)

		return mapUpdateVideoOutToVideoLite(response.data)
	}

	async deleteVideo(id: number): Promise<void> {
		await videoControllerDeleteVideo(id)
	}

	async generateSubtitles(id: number): Promise<SubtitlesStatus> {
		const response = await videoControllerGenerateSubtitles(id)

		return mapToSubtitlesStatus(response.data)
	}

	async getSubtitlesStatus(id: number): Promise<SubtitlesStatus> {
		const response = await videoControllerGetSubtitlesStatus(id)

		return mapToSubtitlesStatus(response.data)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapToVideoLite(raw: VideoLiteOutModel): VideoLite {
	return {
		id: raw.id,
		type: mapType(raw.type),
		name: extractString(raw.name),
		languageCode: extractString(raw.languageCode),
		note: extractString(raw.note),
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
		contentType: raw.contentType,
		fileName: extractString(raw.fileName),
		fileS3Key: extractString(raw.fileS3Key),
		fileUrl: extractString(raw.fileUrl),
		isFileUploaded: extractBoolean(raw.isFileUploaded),
		fileSizeMb: extractNumber(raw.fileSizeMb),
		fileDurationSec: extractNumber(raw.fileDurationSec),
		coverUrl: extractString(raw.coverUrl),
		coverFileName: extractString(raw.coverFileName),
		coverFileS3Key: extractString(raw.coverFileS3Key),
		isCoverFileUploaded: raw.isCoverFileUploaded,
		userId: extractNumber(raw.userId),
	}
}

function mapToVideo(raw: VideoOutModel): Video {
	return {
		...mapToVideoLite(raw),
		subtitlesStatus: null,
	}
}

function mapCreateVideoOutToVideoLite(raw: CreateVideoOutModel): VideoLite {
	return {
		id: raw.id,
		type: mapType(raw.type),
		name: extractString(raw.name),
		languageCode: extractString(raw.languageCode),
		note: null,
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
		contentType: raw.contentType,
		fileName: null,
		fileS3Key: null,
		fileUrl: null,
		isFileUploaded: null,
		fileSizeMb: null,
		fileDurationSec: null,
		coverUrl: null,
		coverFileName: null,
		coverFileS3Key: null,
		isCoverFileUploaded: false,
		userId: extractNumber(raw.userId),
	}
}

function mapUpdateVideoOutToVideoLite(raw: UpdateVideoOutModel): VideoLite {
	return {
		id: raw.id,
		type: 'private',
		name: extractString(raw.name),
		languageCode: extractString(raw.languageCode),
		note: null,
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
		contentType: raw.contentType,
		fileName: null,
		fileS3Key: null,
		fileUrl: extractString(raw.uploadUrl),
		isFileUploaded: null,
		fileSizeMb: extractNumber(raw.fileSizeMb),
		fileDurationSec: extractNumber(raw.fileDurationSec),
		coverUrl: null,
		coverFileName: null,
		coverFileS3Key: null,
		isCoverFileUploaded: false,
		userId: extractNumber(raw.userId),
	}
}

function mapToSubtitlesStatus(raw: VideoSubtitlesStatusOutModel): SubtitlesStatus {
	return {
		videoId: raw.videoId,
		status: extractString(raw.status),
		error: extractString(raw.error),
		startedAt: extractString(raw.startedAt),
		jobId: extractString(raw.jobId),
	}
}

function mapType(raw: string): VideoLite['type'] {
	return raw === 'public' || raw === 'private' ? raw : 'private'
}
