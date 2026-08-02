import { VideoLiteModel } from '@/entites/videos/repository/VideosRepository'
import { videoConfig } from '@/entites/videos/videoConfig'

export function getHeaderAndSubHeader(videoCollection: VideoLiteModel) {
	return {
		header: videoCollection.name || videoConfig.newVideoEmptyName,
	}
}
