import { useUserStore } from 'stores/userStore'
import LogInToSeeOurBooks from '_pages/books/books/booksListSection/LogInToSeeOurBooks/LogInToSeeOurBooks'
import PrivateBooksList from '_pages/books/books/booksListSection/PrivateBooksList/PrivateBooksList'
import { SectionWithHeader } from '../../common/SectionWithHeader/SectionWithHeader'

function PrivateBooksListSection() {
	const user = useUserStore((state) => state.user)
	const isUserLoading = useUserStore((state) => state.isLoading)

	if (isUserLoading) {
		return null
	}

	return (
		<SectionWithHeader title='Загруженные видео'>
			{user ? <PrivateBooksList /> : <LogInToSeeOurBooks />}
		</SectionWithHeader>
	)
}

export default PrivateBooksListSection
