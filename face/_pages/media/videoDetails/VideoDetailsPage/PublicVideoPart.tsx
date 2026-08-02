import MediaFullInfoContent from '@/entites/media/ui/MediaFullInfoContent/MediaFullInfoContent'
import { VideoLiteModel } from '@/entites/videos/repository/VideosRepository'
import { pageUrls } from '@/shared/utils/pageUrls'

type PublicVideoPartProps = {
	video: VideoLiteModel
}

function PublicVideoPart(props: PublicVideoPartProps) {
	const { video } = props

	if (video.type !== 'public') {
		return null
	}

	return (
		<MediaFullInfoContent
			firstChapterUrl={pageUrls.videos.video(video.id).path}
			textContent={video.note}
			coverUrl={video.coverUrl}
			actionButtonLabel='Смотреть'
		/>
	)
}

export default PublicVideoPart
