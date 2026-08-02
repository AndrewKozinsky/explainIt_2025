import { VideoModel } from '@/entites/videos/repository/VideosRepository'
import { videoConfig } from '@/entites/videos/videoConfig'

export function getHeader(videoData: VideoModel) {
	return {
		header: videoData.name || videoConfig.newVideoEmptyName,
	}
}
