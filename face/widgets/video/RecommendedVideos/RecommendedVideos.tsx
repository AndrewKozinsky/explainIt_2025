'use client'

import { useQuery } from '@tanstack/react-query'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'
import { videoConfig } from '@/entities/video/lib/videoConfig'
import { pageUrls } from '@/shared/utils/pageUrls'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import MediaCardButton from '@/widgets/media/MediaCard/MediaCardButton'
import MediaCardLongVideo from '@/widgets/media/MediaCardLongVideo/MediaCardLongVideo'

type RecommendedVideosProps = {
	videoId: string | number
}

function RecommendedVideos(props: RecommendedVideosProps) {
	const { data: items = [] } = useQuery(
		youtubeQueries.getRecommendationsForSavedVideo(props.videoId.toString(), { limit: 6 }),
	)

	if (items.length === 0) {
		return null
	}

	return (
		<ItemsGrid>
			{items.map(function (videoData) {
				if (videoData.durationSeconds > 60 * 60) {
					return (
						<MediaCardLongVideo key={videoData.id} title={videoData.name} duration={videoData.duration} />
					)
				}

				return (
					<MediaCardButton
						key={videoData.id}
						title={videoData.name}
						theme={videoData.topic}
						proficiencyLevel={videoData.proficiencyLevel}
						duration={videoData.duration}
						coverUrl={videoData.coverUrl}
						url={pageUrls.videos.video(videoData.youtubeVideoId ?? videoData.id).path}
						defaultMediaName={videoConfig.newVideoEmptyName}
					/>
				)
			})}
		</ItemsGrid>
	)
}

export default RecommendedVideos
