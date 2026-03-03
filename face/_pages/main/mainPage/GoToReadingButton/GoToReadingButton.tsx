import Link from 'next/link'
import Button from 'ui/formRelated/buttons/Button/Button'
import { ActionIcon } from 'ui/icons/ActionIcon/ActionIcon'
import { pageUrls } from 'сonsts/pageUrls'
import './GoToReadingButton.scss'

function GoToReadingButton() {
	return (
		<div className='go-to-reading-button'>
			<Link href={pageUrls.books.path}>
				<Button icon={<ActionIcon />} theme='accent' size='big'>
					Начать
				</Button>
			</Link>
		</div>
	)
}

export default GoToReadingButton
