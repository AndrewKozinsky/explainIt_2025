'use client'

import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
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
			<EditPrivateVideoForm />
		</MediaPageContentWrapper>
	)
}

export default VideoPage
