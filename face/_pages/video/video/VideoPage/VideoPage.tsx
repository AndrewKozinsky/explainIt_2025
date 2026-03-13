'use client'

import MediaPageContentWrapper from '_pages/bookAndVideoCommon/MediaPageContentWrapper/MediaPageContentWrapper'
import PublicVideoContent from '_pages/video/video/PublicVideoContent/PublicVideoContent'
import VideoBreadCrumbs from '_pages/video/video/root/VideoBreadCrumbs/VideoBreadCrumbs'
import { usePopulateVideoStore } from '_pages/video/video/VideoPage/fn/populateVideoStore'
import EditPrivateVideoForm from '_pages/video/videos/detailsSection/editPrivateVideo/EditPrivateVideoForm/EditPrivateBookForm'
import { useGetHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'

function VideoPage() {
	usePopulateVideoStore()
	const { header, subHeader } = useGetHeaderAndSubHeader()

	return (
		<MediaPageContentWrapper breadCrumbs={<VideoBreadCrumbs />} header={header} subHeader={subHeader}>
			<PublicVideoContent />
			<EditPrivateVideoForm />
		</MediaPageContentWrapper>
	)
}

export default VideoPage
