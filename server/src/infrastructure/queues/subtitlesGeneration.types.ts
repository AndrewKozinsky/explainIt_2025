export type SubtitlesGenerationJobData = {
	videoId: number
	userId: number
}

export type SubtitlesGenerationJobResult = {
	videoId: number
	status: 'done'
}

export const SUBTITLES_GENERATION_JOB_NAME = 'generate'
