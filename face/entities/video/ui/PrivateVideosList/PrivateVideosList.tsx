// 'use client'

// import React from 'react'
// import MediaCardButton from '@/entities/media/ui/MediaCard/MediaCardButton'
// import MediaCardWrapper from '@/entities/media/ui/MediaCardWrapper/MediaCardWrapper'
// import { MediaGridAddButton } from '@/entities/media/ui/MediaGridAddButton/MediaGridAddButton'
// import { videoConfig } from '@/entities/video/lib/videoConfig'
// import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
// import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import { getConfig } from './fn/getConfig'

/*type PrivateVideosListProps = {
	videos: VideoLiteModel[]
	addVideo?: () => Promise<ApiResult<VideoLiteModel>>
}*/

/*function PrivateVideosList(props: PrivateVideosListProps) {
	const { videos, addVideo } = props

	const config = getConfig(videos)

	return (
		<ItemsGrid>
			{config.map(function (video) {
				return (
					<MediaCardWrapper type='edit' key={video.id} actionUrl={video.actionUrl}>
						<MediaCardButton
							name={video.name}
							coverUrl={video.coverUrl}
							url={video.url}
							defaultMediaName={videoConfig.newVideoEmptyName}
						/>
					</MediaCardWrapper>
				)
			})}
			{addVideo && <MediaGridAddButton addAction={addVideo} />}
		</ItemsGrid>
	)
}*/

// export default PrivateVideosList
