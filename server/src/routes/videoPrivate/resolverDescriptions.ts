import { VideoPrivateResolver } from 'src/routes/videoPrivate/videoPrivate.resolver'

export const videoPrivateResolversDesc: Record<keyof typeof VideoPrivateResolver.prototype, string> = {
	createVideoPrivate: 'Create a video',
	updateVideoPrivate: 'Update a video',
}
