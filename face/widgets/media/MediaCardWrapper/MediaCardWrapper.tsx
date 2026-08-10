import { EditIcon } from '@/shared/ui/icons/buttonIcons/EditIcon'
import { InfoIcon } from '@/shared/ui/icons/InfoIcon'
import MediaCardActionButton from '@/widgets/media/MediaCardActionButton/MediaCardActionButton'
import './MediaCardWrapper.scss'

type MediaCardProps = {
	type: 'edit' | 'info'
	actionUrl: string
	children: React.ReactNode
}

function MediaCardWrapper(props: MediaCardProps) {
	const { type, actionUrl, children } = props

	return (
		<div className='media-card-wrapper'>
			{type === 'edit' && (
				<MediaCardActionButton url={actionUrl}>
					<EditIcon />
				</MediaCardActionButton>
			)}
			{type === 'info' && (
				<MediaCardActionButton url={actionUrl}>
					<InfoIcon />
				</MediaCardActionButton>
			)}
			{children}
		</div>
	)
}

export default MediaCardWrapper
