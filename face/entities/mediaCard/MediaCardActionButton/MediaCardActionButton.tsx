import { Link } from '@/i18n/routing'
import './MediaCardActionButton.scss'

type MediaCardButtonProps = {
	url?: string
	onClick?: () => void
	children: React.ReactNode
}

function MediaCardActionButton(props: MediaCardButtonProps) {
	const { url, onClick, children } = props

	if (url) {
		return (
			<Link href={url} onClick={onClick} className='media-card-action-button'>
				{children}
			</Link>
		)
	}

	return (
		<button type='button' onClick={onClick} className='media-card-action-button'>
			{children}
		</button>
	)
}

export default MediaCardActionButton
