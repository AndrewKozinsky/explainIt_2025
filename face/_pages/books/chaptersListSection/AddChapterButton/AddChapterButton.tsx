import React, { useContext } from 'react'
import Button from '../../../../ui/formRelated/buttons/Button/Button'
import { NotificationContext } from '../../../../ui/Notification/context'
import { publicFolderFilesUrls } from '../../../../utils/publicFolderFilesUrls'
import { useGetOnAddChapterClick } from './fn/getOnAddChapterClick'

function AddChapterButton() {
	const { notify } = useContext(NotificationContext)
	const { onAddChapterClick, status } = useGetOnAddChapterClick(notify)

	return (
		<Button
			icon={publicFolderFilesUrls.icons.plusButtonIcon}
			onClick={onAddChapterClick}
			loading={status === 'loading'}
		>
			главу
		</Button>
	)
}

export default AddChapterButton
