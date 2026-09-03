import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entities/mediaCard/MediaCardWrapper/MediaCardWrapper'
import { MediaGridAddButton } from '@/entities/mediaCard/MediaGridAddButton/MediaGridAddButton'
import { EditIcon } from '@/shared/ui/icons/buttonIcons/EditIcon'
import { videoConfig } from '@/entities/video/lib/videoConfig'
import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { getConfig } from './fn/getConfig'

type PrivateVideosListProps = {
	videos: VideoLiteModel[]
	addVideo?: () => Promise<ApiResult<VideoLiteModel>>
}

function PrivateVideosList(props: PrivateVideosListProps) {
	const { videos, addVideo } = props

	const config = getConfig(videos)

	return (
		<ItemsGrid>
			{config.map(function (video) {
				return (
					<MediaCardWrapper key={video.id} actionUrl={video.actionUrl} actionIcon={<EditIcon />}>
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
}

export default PrivateVideosList
