// import cn from 'classnames'
// import BaseButton from 'ui/BaseButton/BaseButton'

/*type MediaCardProps = {
	type: 'private' | 'public'
	name?: null | string
	subName?: null | number | string
	url: string
	coverUrl?: string
	backgroundColor?: string
	defaultMediaName: string
	freeToUse?: boolean
}*/

/*function MediaCard(props: MediaCardProps) {
	const { type, name, subName, url, coverUrl, backgroundColor, defaultMediaName } = props

	return (
		<BaseButton
			theme='regular'
			href={url}
			style={backgroundColor ? ({ ['--media-card-bg']: backgroundColor } as any) : undefined}
			extraClass={cn(
				'media-items-grid__card',
				type === 'public' ? 'media-items-grid__card--public' : '',
				type === 'private' ? 'media-items-grid__card--private' : '',
			)}
		>
			{coverUrl && <img src={coverUrl} className='media-items-grid__card-cover' alt='cover' />}
			<div className={cn('media-items-grid__card-text-wrapper')}>
				{subName && <p className='media-items-grid__card-sub-name'>{subName}</p>}
				{<p className='media-items-grid__card-name'>{name ?? defaultMediaName}</p>}
			</div>
		</BaseButton>
	)
}*/

// export default MediaCard
