import cn from 'classnames'
import Link from 'next/link'

type MediaCardProps = {
	name?: null | string
	subName?: null | number | string
	url: string
	coverUrl?: string
	backgroundColor?: string
	defaultMediaName: string
}

function MediaCard(props: MediaCardProps) {
	const { name, subName, url, coverUrl, backgroundColor, defaultMediaName } = props

	return (
		<Link className='media-items-grid__card' style={{ backgroundColor: backgroundColor }} href={url}>
			{coverUrl && <img src={coverUrl} className='media-items-grid__card-cover' alt='cover' />}
			<div
				className={cn(
					'media-items-grid__card-text-wrapper',
					backgroundColor && 'media-items-grid__card-text-wrapper--white',
				)}
			>
				{subName && <p className='media-items-grid__card-sub-name'>{subName}</p>}
				{<p className='media-items-grid__card-name'>{name ?? defaultMediaName}</p>}
			</div>
		</Link>
	)
}

export default MediaCard
