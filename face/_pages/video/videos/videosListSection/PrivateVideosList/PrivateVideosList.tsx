import { useUserStore } from 'stores/userStore'
import AddVideoButton from '../AddBookButton/AddVideoButton'
import PrivateVideosListContent from './PrivateVideosListContent'

function PrivateVideosList() {
	const user = useUserStore((state) => state.user)

	const tariffCode = user?.currentSubscription?.tariffCode
	if (!tariffCode?.startsWith('standard')) {
		return null
	}

	return (
		<>
			<PrivateVideosListContent />
			<AddVideoButton />
		</>
	)
}

export default PrivateVideosList
