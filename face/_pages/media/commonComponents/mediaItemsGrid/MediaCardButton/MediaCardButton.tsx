import cn from 'classnames'
import BaseButton from '@/shared/ui/BaseButton/BaseButton'

type MediaCardProps = {
	type: 'private' | 'public'
	name?: null | string
	subName?: null | number | string
	actionUrl: string
	url: string
	coverUrl?: string
	defaultMediaName: string
}

function MediaCardButton(props: MediaCardProps) {
	const { type, name, subName, url, coverUrl, defaultMediaName } = props

	return (
		<BaseButton
			href={url}
			extraClass={cn(
				'media-items-grid__card',
				type === 'public' ? 'media-items-grid__card--public' : '',
				type === 'private' ? 'media-items-grid__card--private' : '',
			)}
		>
			<div
				className='media-items-grid__card-cover'
				style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : '' }}
			></div>
			<div className={cn('media-items-grid__card-text-wrapper')}>
				{subName && <p className='media-items-grid__card-sub-name'>{subName}</p>}
				{<p className='media-items-grid__card-name'>{name ?? defaultMediaName}</p>}
			</div>
		</BaseButton>
	)
}

export default MediaCardButton
