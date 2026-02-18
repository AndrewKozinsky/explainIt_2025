import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
import UnauthorizedUserGuardInMediaList from '_pages/bookAndVideoCommon/UnauthorizedUserGuardInMediaList/UnauthorizedUserGuardInMediaList'
import PrivateBooksList from '../PrivateBooksList/PrivateBooksList'

function PrivateBooksListSection() {
	return (
		<SectionWithHeader title='Загруженные книги'>
			<UnauthorizedUserGuardInMediaList contentType='books' />
			<PrivateBooksList />
		</SectionWithHeader>
	)
}

export default PrivateBooksListSection
