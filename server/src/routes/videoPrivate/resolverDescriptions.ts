import { VideoPrivateResolver } from 'routes/videoPrivate/videoPrivate.resolver'

export const videoPrivateResolversDesc: Record<keyof typeof VideoPrivateResolver.prototype, string> = {
	createVideoPrivate: 'Create a video',
	updateVideoPrivate: 'Update a video',
	deleteVideoPrivate: 'Delete a video',
	getUserVideosPrivate: 'Get user videos',
	getVideoPrivate: 'Get a video',
	generateSubtitlesForPrivateVideo:
		'Enqueue automatic subtitles generation (ASR) for a private uploaded video. Requires min balance.',
	videoPrivateSubtitlesStatus: 'Poll current status of automatic subtitles generation for a private video.',
}
