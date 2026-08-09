import { videoConfig } from '@/entities/video/lib/videoConfig'
import { VideoLiteModel } from '@/entities/video/repository/VideosRepository'

export function getHeaderAndSubHeader(videoCollection: VideoLiteModel) {
	return {
		header: videoCollection.name || videoConfig.newVideoEmptyName,
	}
}
