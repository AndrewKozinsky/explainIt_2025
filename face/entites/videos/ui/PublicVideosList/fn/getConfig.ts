import { pageUrls } from '@/shared/utils/pageUrls'
import { VideoLiteModel } from '../../../repository/VideosRepository'

export function getConfig(videosData: VideoLiteModel[]) {
	return videosData.map(function (video) {
		return {
			id: video.id,
			name: video.name,
			subName: null as null,
			coverUrl: video.coverUrl,
			url: pageUrls.videos.video(video.id).path,
			actionUrl: pageUrls.videos.video(video.id, true).path,
		}
	})
}
