import LogInToSeeOurBooks from '_pages/books/books/booksListSection/LogInToSeeOurBooks/LogInToSeeOurBooks'
import { useUserStore } from 'stores/userStore'
import { SectionWithHeader } from '../../common/SectionWithHeader/SectionWithHeader'
import PrivateVideosList from '_pages/books/books/booksListSection/PrivateBooksList/PrivateVideosList'

function PrivateVideosListSection() {
	const user = useUserStore((state) => state.user)
	const isUserLoading = useUserStore((state) => state.isLoading)

	if (isUserLoading) {
		return null
	}

	return (
		<SectionWithHeader title='Загруженные видео'>
			{user ? <PrivateVideosList /> : <LogInToSeeOurBooks />}
		</SectionWithHeader>
	)
}

export default PrivateVideosListSection
