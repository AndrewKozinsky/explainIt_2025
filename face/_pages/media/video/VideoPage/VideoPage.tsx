'use client'

import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import PrivateVideoContent from '_pages/media/video/PrivateVideoContent/PrivateVideoContent'
import EditPrivateVideoForm from '../editPrivateVideo/EditPrivateVideoForm/EditPrivateVideoForm'
import PublicVideoContent from '../PublicVideoContent/PublicVideoContent'
import VideoBreadCrumbs from '../VideoBreadCrumbs/VideoBreadCrumbs'
import { useGetHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { usePopulateVideoStore } from './fn/populateVideoStore'

function VideoPage() {
	usePopulateVideoStore()
	const { header, subHeader } = useGetHeaderAndSubHeader()

	return (
		<MediaPageContentWrapper breadCrumbs={<VideoBreadCrumbs />} header={header} subHeader={subHeader}>
			<PublicVideoContent />
			<PrivateVideoContent />
		</MediaPageContentWrapper>
	)
}

export default VideoPage
