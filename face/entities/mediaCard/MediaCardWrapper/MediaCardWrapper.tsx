import MediaCardActionButton from '@/entities/mediaCard/MediaCardActionButton/MediaCardActionButton'
import './MediaCardWrapper.scss'

type MediaCardProps = {
	actionIcon: React.ReactNode
	actionUrl?: string
	onActionClick?: () => void
	children: React.ReactNode
}

function MediaCardWrapper(props: MediaCardProps) {
	const { actionIcon, actionUrl, onActionClick, children } = props

	return (
		<div className='media-card-wrapper'>
			<MediaCardActionButton url={actionUrl} onClick={onActionClick}>
				{actionIcon}
			</MediaCardActionButton>
			{children}
		</div>
	)
}

export default MediaCardWrapper
