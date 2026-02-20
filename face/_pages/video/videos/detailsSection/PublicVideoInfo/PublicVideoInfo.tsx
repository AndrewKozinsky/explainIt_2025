import { useParams } from 'next/navigation'
import PublicMediaInfo from '_pages/bookAndVideoCommon/PublicMediaInfo/PublicMediaInfo'
import { useVideosStore } from '_pages/video/videos/videosStore'
import { pageUrls } from 'сonsts/pageUrls'

export default function PublicVideoInfo() {
	const urlVideoId = useParams().videoId as string
	const publicVideo = useVideosStore((s) => s.publicVideo)

	if (!publicVideo) {
		return null
	}

	const watchUrl = pageUrls.videos.video(urlVideoId).watching.path

	return (
		<PublicMediaInfo
			header={publicVideo.name}
			subHeader={publicVideo.year.toString()}
			coverUrls={publicVideo.covers}
			text={publicVideo.note}
			contentType='book'
			mediaUrl={watchUrl}
		/>
	)
}
