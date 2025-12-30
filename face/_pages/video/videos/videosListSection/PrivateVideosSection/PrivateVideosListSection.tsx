import { useUserStore } from 'stores/userStore'
import { SectionWithHeader } from '../../common/SectionWithHeader/SectionWithHeader'
import PrivateVideosList from '../PrivateVideosList/PrivateVideosList'
import LogInToSeeOurBooks from '../LogInToSeeOurBooks/LogInToSeeOurBooks'

function PrivateBooksListSection() {
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

export default PrivateBooksListSection
