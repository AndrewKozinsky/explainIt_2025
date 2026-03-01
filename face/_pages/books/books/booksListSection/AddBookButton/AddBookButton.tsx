import Button from '@/ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from '@/utils/publicFolderFilesUrls'
import { useGetOnAddBookClick } from './fn/getOnAddBookClick'

function AddBookButton() {
	const { onAddBookClick, status } = useGetOnAddBookClick()

	return (
		<Button
			icon={publicFolderFilesUrls.icons.plusButtonIcon}
			onClick={onAddBookClick}
			loading={status === 'loading'}
		>
			Книгу
		</Button>
	)
}

export default AddBookButton
