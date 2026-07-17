import type { VideoLite } from '@/entites/videos/repository/VideosRepository'
import type { LanguageCode } from '@/shared/utils/languages'
import { pageUrls } from '@/shared/utils/pageUrls'
import type {
	MediaItemsGridConfig,
	PrivateItem,
	PublicItem,
} from '_pages/media/commonComponents/mediaItemsGrid/MediaItemsGrid/types'
import { videoConfig } from '_pages/media/commonComponents/videoConfig'

/**
 * Формирует конфиг для MediaItemsGrid из унифицированных видео.
 * Чистая функция — не зависит от API, сторов или хуков.
 */
export function getContentConfig(videos: VideoLite[]): MediaItemsGridConfig {
	const privateVideos = videos.filter((video) => video.type === 'private')
	const publicVideos = videos.filter((video) => video.type === 'public')

	return {
		privateItems: privateVideos.map(toPrivateItem),
		publicItems: publicVideos.map(toPublicItem),
	}
}

function toPrivateItem(video: VideoLite): PrivateItem {
	const videoId = String(video.id)

	return {
		name: video.name,
		subName: null,
		url: pageUrls.videos.video(videoId).watching.path,
		actionUrl: pageUrls.videos.video(videoId).path,
		coverUrl: video.coverUrl ?? undefined,
	}
}

function toPublicItem(video: VideoLite): PublicItem {
	const videoId = String(video.id)

	return {
		name: video.name ?? videoConfig.newVideoEmptyName,
		subName: null,
		languageCode: (video.languageCode as LanguageCode) ?? 'en',
		coverUrl: video.coverUrl ?? '',
		url: pageUrls.videos.video(videoId).watching.path,
		actionUrl: pageUrls.videos.video(videoId).path,
	}
}
