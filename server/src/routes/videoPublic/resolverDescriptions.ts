import { VideoPublicResolver } from 'routes/videoPublic/videoPublic.resolver'

export const videoPublicResolversDesc: Record<keyof typeof VideoPublicResolver.prototype, string> = {
	getVideosPublic: 'Get public videos',
	getVideoPublic: 'Get public video',
}
