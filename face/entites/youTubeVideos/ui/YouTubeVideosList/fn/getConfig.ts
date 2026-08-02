import { YoutubeVideoModel } from '@/entites/youTubeVideos/repository/YoutubeRepository'
import { pageUrls } from '@/shared/utils/pageUrls'

export function getConfig(videosData: YoutubeVideoModel[]) {
	return videosData.map(function (collection) {
		return {
			id: collection.videoId,
			name: collection.title,
			subName: collection.channelName,
			coverUrl: collection.thumbnailUrl,
			url: pageUrls.youtube.video(collection.videoId).path,
		}
	})
}
