import Paragraph from '@/ui/Paragraph/Paragraph'
import { pageUrls } from '@/сonsts/pageUrls'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetBookLinkStatus } from './fn/isPageCurrent'
import { videoConfig } from '_pages/video/videos/common/videoConfig'
import { useGetOnBookLinkClick } from './fn/onClick'
import './VideoLink.scss'

type VideoLinkProps = {
	bookData: {
		id: number
		bookType: 'public' | 'private'
		name?: null | string
	}
}

function VideoLink(props: VideoLinkProps) {
	const { id, bookType, name } = props.bookData

	const bookLinkStatus = useGetBookLinkStatus(id, bookType)
	const onBookLinkClick = useGetOnBookLinkClick()

	return (
		<ContentLinkWrapper href={pageUrls.videos.video(id).path} status={bookLinkStatus} onClick={onBookLinkClick}>
			<div className='book-link'>
				<Paragraph fontSize='18'>{name ? name : videoConfig.emptyVideoName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default VideoLink
