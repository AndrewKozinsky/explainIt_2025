import cn from 'classnames'
import Link from 'next/link'
import BaseButton from 'ui/BaseButton/BaseButton'
import { EditIcon } from 'ui/icons/EditIcon'
import { InfoIcon } from 'ui/icons/InfoIcon'

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
	const { type, name, subName, actionUrl, url, coverUrl, backgroundColor, defaultMediaName } = props

	return (
		<BaseButton
			style={backgroundColor ? ({ ['--media-card-bg']: backgroundColor } as any) : undefined}
			extraClass={cn(
				'media-items-grid__card',
				type === 'public' ? 'media-items-grid__card--public' : '',
				type === 'private' ? 'media-items-grid__card--private' : '',
			)}
		>
			<div
				className='media-items-grid__card-cover'
				style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : '' }}
			>
				{type === 'private' && (
					<MediaCardButton url={actionUrl}>
						<EditIcon />
					</MediaCardButton>
				)}
				{type === 'public' && (
					<MediaCardButton url={actionUrl}>
						<InfoIcon />
					</MediaCardButton>
				)}
			</div>
			<div className={cn('media-items-grid__card-text-wrapper')}>
				{subName && <p className='media-items-grid__card-sub-name'>{subName}</p>}
				{<p className='media-items-grid__card-name'>{name ?? defaultMediaName}</p>}
			</div>
		</BaseButton>
	)
}

export default MediaCard

type MediaCardButtonProps = {
	url: string
	children: React.ReactNode
}

function MediaCardButton(props: MediaCardButtonProps) {
	const { url, children } = props

	return (
		<Link href={url} className='media-items-grid__action-button'>
			{children}
		</Link>
	)
}
