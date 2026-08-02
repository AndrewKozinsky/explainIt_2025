export type SubtitlesJobSource = 'userUpload' | 'youTube'

export type SubtitlesGenerationJobData = {
	videoId: number
	source: SubtitlesJobSource
	/** User ID who initiated the job. Undefined for YouTube videos (public). */
	userId?: number
}

export type SubtitlesGenerationJobResult = {
	videoId: number
	status: 'done'
}

export const SUBTITLES_GENERATION_JOB_NAME = 'generate'
