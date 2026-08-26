// import { videoConfig } from '@/entities/video/lib/videoConfig'
// import { VideoModel } from '@/entities/video/repository/VideosRepository'

export function getHeader(videoData: VideoModel) {
	return {
		header: videoData.name || videoConfig.newVideoEmptyName,
	}
}
