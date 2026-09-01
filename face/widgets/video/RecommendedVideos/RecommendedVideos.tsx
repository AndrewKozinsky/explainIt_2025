'use client'

import { useQuery } from '@tanstack/react-query'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import { videoConfig } from '@/entities/video/lib/videoConfig'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import { pageUrls } from '@/shared/utils/pageUrls'
import './RecommendedVideos.scss'

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
		<div className='recommended-video'>
			<p className='recommended-video__header'>Другие видео:</p>
			<ItemsGrid size='small'>
				{items.map(function (videoData) {
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
							size='small'
						/>
					)
				})}
			</ItemsGrid>
		</div>
	)
}

export default RecommendedVideos
