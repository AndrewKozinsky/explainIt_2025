import React from 'react'
import Link from 'next/link'
import Button from 'ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { pageUrls } from 'сonsts/pageUrls'
import './GoToReadingButton.scss'

function GoToReadingButton() {
	return (
		<div className='go-to-reading-button'>
			<Link href={pageUrls.books.path}>
				<Button icon={publicFolderFilesUrls.icons.actionButtonIcon}>Начать</Button>
			</Link>
		</div>
	)
}

export default GoToReadingButton
