'use client'

import MediaCardButton from '@/entites/media/ui/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entites/media/ui/MediaCardWrapper/MediaCardWrapper'
import { videoConfig } from '@/entites/videos/videoConfig'
import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'
import { VideoLiteModel } from '../../repository/VideosRepository'
import { getConfig } from './fn/getConfig'

type PublicVideosListProps = {
	videos: VideoLiteModel[]
}

function PublicVideosList(props: PublicVideosListProps) {
	const { videos } = props

	const config = getConfig(videos)

	return (
		<ItemsGrid>
			{config.map(function (video) {
				return (
					<MediaCardWrapper type='info' key={video.id} actionUrl={video.actionUrl}>
						<MediaCardButton
							name={video.name}
							coverUrl={video.coverUrl}
							url={video.url}
							defaultMediaName={videoConfig.newVideoEmptyName}
						/>
					</MediaCardWrapper>
				)
			})}
		</ItemsGrid>
	)
}

export default PublicVideosList
