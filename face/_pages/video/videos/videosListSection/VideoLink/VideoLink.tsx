import Paragraph from '@/ui/Paragraph/Paragraph'
import { createVideoIdUrl, pageUrls } from '@/сonsts/pageUrls'
import { videoConfig } from '_pages/video/videos/common/videoConfig'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetVideoLinkStatus } from './fn/isPageCurrent'
import { useGetOnBookLinkClick } from './fn/onClick'
import './VideoLink.scss'

type VideoLinkProps = {
	videoData: {
		id: number
		videoType: 'public' | 'private'
		name?: null | string
	}
}

function VideoLink(props: VideoLinkProps) {
	const { id, videoType, name } = props.videoData

	const bookLinkStatus = useGetVideoLinkStatus(id, videoType)
	const onBookLinkClick = useGetOnBookLinkClick()
	const videoIdInUrl = createVideoIdUrl(id, videoType)

	const href =
		videoType === 'public'
			? pageUrls.videos.video(videoIdInUrl).watching.path
			: pageUrls.videos.video(videoIdInUrl).path

	return (
		<ContentLinkWrapper href={href} status={bookLinkStatus} onClick={onBookLinkClick}>
			<div className='book-link'>
				<Paragraph fontSize='18'>{name ? name : videoConfig.emptyVideoName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default VideoLink
