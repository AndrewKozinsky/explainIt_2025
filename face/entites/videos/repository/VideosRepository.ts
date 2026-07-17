/**
 * Унифицированный тип видео (лайт-версия, для списка).
 * Компоненты работают только с этим типом — он не зависит от API.
 */
export type VideoLite = {
	id: number
	type: 'public' | 'private'
	name: null | string
	languageCode: null | string
	note: null | string
	originalContent: null | string
	processedContent: null | string
	contentType: string
	fileName: null | string
	fileS3Key: null | string
	fileUrl: null | string
	isFileUploaded: null | boolean
	fileSizeMb: null | number
	fileDurationSec: null | number
	coverUrl: null | string
	coverFileName: null | string
	coverFileS3Key: null | string
	isCoverFileUploaded: boolean
	userId: null | number
}

/**
 * Унифицированный тип видео (полная версия, с субтитрами и предложениями).
 */
export type Video = VideoLite & {
	subtitlesStatus: null | SubtitlesStatus
}

/**
 * Статус генерации субтитров.
 */
export type SubtitlesStatus = {
	videoId: number
	status: null | string
	error: null | string
	startedAt: null | string
	jobId: null | string
}

/**
 * Унифицированный тип для создания видео.
 */
export type CreateVideoInput = {
	name: null | string
	originalContent: null | string
	fileSizeMb: null | number
	fileDurationSec: null | number
	languageCode: string
}

/**
 * Унифицированный тип для обновления видео.
 */
export type UpdateVideoInput = {
	name: null | string
	languageCode: null | string
	originalContent: null | string
	fileName: null | string
	fileMimeType: null | string
	isFileUploaded: null | boolean
	fileSizeMb: null | number
	fileDurationSec: null | number
}

/**
 * Репозиторий видео — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type VideosRepository = {
	/** Получить все видео (публичные + приватные пользователя) */
	getVideos(): Promise<VideoLite[]>

	/** Получить видео по ID с полной информацией */
	getVideo(id: number): Promise<Video>

	/** Создать приватное видео */
	createVideo(input: CreateVideoInput): Promise<VideoLite>

	/** Обновить приватное видео */
	updateVideo(id: number, input: UpdateVideoInput): Promise<VideoLite>

	/** Удалить приватное видео */
	deleteVideo(id: number): Promise<void>

	/** Запустить генерацию субтитров для загруженного видео */
	generateSubtitles(id: number): Promise<SubtitlesStatus>

	/** Получить статус генерации субтитров */
	getSubtitlesStatus(id: number): Promise<SubtitlesStatus>
}
