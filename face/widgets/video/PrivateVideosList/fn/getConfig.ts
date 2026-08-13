import { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import { pageUrls } from '@/shared/utils/pageUrls'

export function getConfig(videosData: VideoLiteModel[]) {
	return videosData.map(function (video) {
		return {
			id: video.id,
			name: video.name,
			subName: null as null,
			coverUrl: null as null | string,
			url: pageUrls.youtube.video(video.id).path,
			actionUrl: pageUrls.youtube.video(video.id, true).path,
		}
	})
}
