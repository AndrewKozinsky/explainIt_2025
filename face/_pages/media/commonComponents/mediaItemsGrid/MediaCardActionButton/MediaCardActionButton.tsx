import { Link } from '@/i18n/routing'
import './MediaCardActionButton.scss'

type MediaCardButtonProps = {
	url: string
	children: React.ReactNode
}

function MediaCardActionButton(props: MediaCardButtonProps) {
	const { url, children } = props

	return (
		<Link href={url} className='media-items-grid-action-button'>
			{children}
		</Link>
	)
}

export default MediaCardActionButton
