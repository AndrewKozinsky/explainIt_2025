import { errorMessage } from 'infrastructure/exceptions/errorMessage'

/**
 * Classify an error message into a machine-readable error code.
 *
 * Uses the centralised error codes from {@link errorMessage} so the
 * stored `errorCode` column stays consistent with the rest of the app.
 */
export function classifyError(message: string): string {
	// ASR / Deepgram errors
	if (message.includes('Deepgram')) return errorMessage.video.subtitlesAsrFailed.code
	if (message.includes('no transcribed content')) return errorMessage.video.subtitlesAsrFailed.code

	// Duration exceeded the configured limit
	if (message.includes('exceeds the') && message.includes('limit')) {
		return errorMessage.video.subtitlesGenerationVideoTooLong.code
	}

	// Missing video / metadata
	if (message.includes('not found')) return errorMessage.video.notFound.code
	if (message.includes('not uploaded')) return errorMessage.video.subtitlesGenerationFileNotUploaded.code
	if (message.includes('no language code')) return errorMessage.video.subtitlesGenerationLanguageRequired.code
	if (message.includes('no youtube_video_id')) return errorMessage.youtube.videoNotFound.code

	// YouTube audio download errors (yt-dlp failures, etc.)
	if (message.includes('yt-dlp') || message.includes('youtube')) return errorMessage.youtube.audioDownloadFailed.code

	// FFmpeg / ffprobe processing errors
	if (message.includes('ffmpeg') || message.includes('ffprobe')) return errorMessage.video.subtitlesGenerationFailed.code

	return errorMessage.unknownError.code
}
