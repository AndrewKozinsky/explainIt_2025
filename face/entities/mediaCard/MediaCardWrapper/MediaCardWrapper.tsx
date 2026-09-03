import MediaCardActionButton from '@/entities/mediaCard/MediaCardActionButton/MediaCardActionButton'
import './MediaCardWrapper.scss'

type MediaCardProps = {
	actionIcon: React.ReactNode
	actionUrl: string
	children: React.ReactNode
}

function MediaCardWrapper(props: MediaCardProps) {
	const { actionIcon, actionUrl, children } = props

	return (
		<div className='media-card-wrapper'>
			<MediaCardActionButton url={actionUrl}>{actionIcon}</MediaCardActionButton>
			{children}
		</div>
	)
}

export default MediaCardWrapper
