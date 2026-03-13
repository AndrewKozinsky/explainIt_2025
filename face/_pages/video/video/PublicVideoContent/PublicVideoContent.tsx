import { useRouter } from 'next/navigation'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { SummaryOfTheMedia } from '_pages/bookAndVideoCommon/SummaryOfTheMedia/SummaryOfTheMedia'
import { useVideoStore } from '_pages/video/video/videoStore'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'
import './PublicVideoContent.scss'

export default function PublicVideoContent() {
	const publicVideo = useVideoStore((s) => s.publicVideo)

	if (!publicVideo.data) {
		return null
	}

	const coverImgUrls = publicVideo.data?.covers

	const videoId = createMediaIdUrl(publicVideo.data.id, 'public')
	const videoUrl = pageUrls.videos.video(videoId).path

	return (
		<div className='public-video-info'>
			<div className='public-video-info__left-aside'>
				{coverImgUrls.map((imgUrl, index) => {
					return <img key={index} className='public-video-info__cover' src={imgUrl} alt='book cover' />
				})}
			</div>
			<div className='public-video-info__right-aside'>
				<SummaryOfTheMedia text={publicVideo.data.note} />
				<PublicBookInfoActions videoUrl={videoUrl} />
			</div>
		</div>
	)
}

type PublicBookInfoActionsProps = {
	videoUrl: string
}

function PublicBookInfoActions(props: PublicBookInfoActionsProps) {
	const { videoUrl } = props

	const router = useRouter()
	const actionLabel = 'Смотреть'

	function handleActionClick() {
		router.push(videoUrl)
	}

	return (
		<div className='public-video-info__actions'>
			<Button onClick={handleActionClick} icon={publicFolderFilesUrls.icons.actionButtonIcon}>
				{actionLabel}
			</Button>
		</div>
	)
}
