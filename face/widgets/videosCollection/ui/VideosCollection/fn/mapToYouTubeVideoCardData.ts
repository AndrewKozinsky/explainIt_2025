import type { VideoLiteModel } from '@/entities/video/lib/types'
import { YouTubeVideoCardData } from '@/entities/video/YouTubeVideosList/YouTubeVideosList'
import { pageUrls } from '@/shared/utils/pageUrls'

export function mapToYouTubeVideoCardData(videos: VideoLiteModel[]): YouTubeVideoCardData[] {
	return videos.map(function (video) {
		return {
			id: video.id,
			name: video.name,
			theme: video.topic,
			duration: video.duration!,
			durationSeconds: video.durationSeconds,
			coverUrl: video.coverUrl,
			url: video.youtubeVideoId ? pageUrls.videos.video(video.youtubeVideoId).path : '',
			proficiencyLevel: video.proficiencyLevel,
		}
	})
}
