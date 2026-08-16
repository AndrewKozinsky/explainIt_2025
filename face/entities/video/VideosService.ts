import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { VideosApi } from './repository/VideosApi'
import type {
	VideoModel,
	VideoLiteModel,
	SubtitlesStatusModel,
	VideosRepository,
	CreateVideoInput,
	UpdateVideoInput,
} from './repository/VideosRepository'
//
export type {
	VideoModel,
	VideoLiteModel,
	SubtitlesStatusModel,
	VideosRepository,
	CreateVideoInput,
	UpdateVideoInput,
} from './repository/VideosRepository'

/**
 * Сервис видео — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link VideosRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new VideosApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class VideosService {
	/** Поддерживаемые форматы видео-файлов */
	static readonly supportedVideoFormats = {
		accept: {
			'video/mp4': ['.mp4'],
			'video/webm': ['.webm'],
			'video/ogg': ['.ogg'],
		},
		description: 'MP4, WebM, OGG',
	}

	private videosRepository: VideosRepository

	constructor(videosRepository: VideosRepository) {
		this.videosRepository = videosRepository
	}

	/** Получить все видео, разделённые по типу (публичные / приватные) */
	async getVideos(): Promise<ApiResult<{ public: VideoLiteModel[]; private: VideoLiteModel[] }>> {
		const result = await this.videosRepository.getVideos()

		if (result.error || result.errors) {
			return {
				error: result.error,
				errors: result.errors,
				data: null as unknown as { public: VideoLiteModel[]; private: VideoLiteModel[] },
			}
		}

		return {
			error: null,
			errors: null,
			data: {
				public: result.data.filter((video) => video.type === 'public'),
				private: result.data.filter((video) => video.type === 'private'),
			},
		}
	}

	/** Получить полные данные видео (с субтитрами) */
	async getVideo(id: string | number): Promise<ApiResult<VideoModel>> {
		return this.videosRepository.getVideo(id)
	}

	/** Создать новое видео в коллекции */
	async createVideo(input: CreateVideoInput): Promise<ApiResult<VideoLiteModel>> {
		return this.videosRepository.createVideo(input)
	}

	/** Обновить видео */
	async updateVideo(id: number, input: UpdateVideoInput): Promise<ApiResult<VideoLiteModel>> {
		return this.videosRepository.updateVideo(id, input)
	}

	/** Удалить видео */
	async deleteVideo(id: number): Promise<ApiResult<void>> {
		return this.videosRepository.deleteVideo(id)
	}

	/** Запустить генерацию субтитров */
	async generateSubtitles(id: number): Promise<ApiResult<SubtitlesStatusModel>> {
		return this.videosRepository.generateSubtitles(id)
	}

	/** Получить статус генерации субтитров */
	async getSubtitlesStatus(id: number): Promise<ApiResult<SubtitlesStatusModel>> {
		return this.videosRepository.getSubtitlesStatus(id)
	}

	/**
	 * Запросить pre-signed URL для загрузки видео-файла.
	 * Обновляет метаданные файла и возвращает URL для загрузки в S3.
	 */
	async requestVideoUploadUrl(
		videoId: number,
		fileName: string,
		fileMimeType: string,
		fileSizeMb: number,
		fileDurationSec: number,
	): Promise<ApiResult<VideoLiteModel>> {
		return this.videosRepository.updateVideo(videoId, {
			fileName: fileName,
			fileMimeType: fileMimeType,
			fileSizeMb: fileSizeMb,
			fileDurationSec: fileDurationSec,
		})
	}

	/** Подтвердить завершение загрузки видео-файла */
	async confirmVideoUpload(videoId: number, fileDurationSec: number): Promise<ApiResult<VideoLiteModel>> {
		return this.videosRepository.updateVideo(videoId, {
			isFileUploaded: true,
			fileDurationSec: fileDurationSec,
		})
	}
}

/** Готовый экземпляр сервиса с реальным API */
export const videosService = new VideosService(new VideosApi())
