import Button from '@/ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from '@/utils/publicFolderFilesUrls'
import { useGetOnAddVideoClick } from './fn/getOnAddBookClick'

function AddVideoButton() {
	const { onAddBookClick, status } = useGetOnAddVideoClick()

	return (
		<Button
			icon={publicFolderFilesUrls.icons.plusButtonIcon}
			onClick={onAddBookClick}
			loading={status === 'loading'}
		>
			Добавить видео
		</Button>
	)
}

export default AddVideoButton
