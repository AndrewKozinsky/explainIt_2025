import React from 'react'
import { EditIcon } from 'ui/icons/buttonIcons/EditIcon'
import { InfoIcon } from 'ui/icons/InfoIcon'
import MediaCardActionButton from '../MediaCardActionButton/MediaCardActionButton'
import MediaCardButton from '../MediaCardButton/MediaCardButton'
import './MediaCard.scss'

type MediaCardProps = {
	type: 'private' | 'public'
	name?: null | string
	subName?: null | number | string
	actionUrl: string
	url: string
	coverUrl?: string
	backgroundColor?: string
	defaultMediaName: string
	freeToUse?: boolean
}

function MediaCard(props: MediaCardProps) {
	const { type, actionUrl } = props

	return (
		<div className='media-items-grid-card'>
			{type === 'private' && (
				<MediaCardActionButton url={actionUrl}>
					<EditIcon />
				</MediaCardActionButton>
			)}
			{type === 'public' && (
				<MediaCardActionButton url={actionUrl}>
					<InfoIcon />
				</MediaCardActionButton>
			)}
			<MediaCardButton {...props} />
		</div>
	)
}

export default MediaCard
