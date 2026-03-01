import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
import UnauthorizedUserGuardInMediaList from '_pages/bookAndVideoCommon/UnauthorizedUserGuardInMediaList/UnauthorizedUserGuardInMediaList'
import PrivateVideosList from '../PrivateVideosList/PrivateVideosList'

function PrivateBooksListSection() {
	return (
		<SectionWithHeader title='Загруженные видео'>
			<UnauthorizedUserGuardInMediaList contentType='videos' />
			<PrivateVideosList />
		</SectionWithHeader>
	)
}

export default PrivateBooksListSection
