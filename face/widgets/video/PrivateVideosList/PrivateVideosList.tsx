// import { videoConfig } from '@/entities/video/lib/videoConfig'
// import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
// import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import MediaCardButton from '@/widgets/media/MediaCard/MediaCardButton'
// import MediaCardWrapper from '@/widgets/media/MediaCardWrapper/MediaCardWrapper'
// import { MediaGridAddButton } from '@/widgets/media/MediaGridAddButton/MediaGridAddButton'
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
							title={video.name}
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
