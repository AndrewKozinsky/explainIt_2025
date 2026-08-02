import BaseButton from '@/shared/ui/BaseButton/BaseButton'
import './MediaCardButton.scss'

type MediaCardProps = {
	name?: null | string
	subName?: null | number | string
	url: string
	coverUrl?: null | string
	defaultMediaName: string
}

function MediaCardButton(props: MediaCardProps) {
	const { name, subName, url, coverUrl, defaultMediaName } = props

	return (
		<BaseButton href={url} extraClass='media-card-button' theme='outline'>
			<div
				className='media-card-button__cover'
				style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : '' }}
			></div>
			<div className='media-card-button__text-wrapper'>
				{<p className='media-card-button__name'>{name ?? defaultMediaName}</p>}
				{subName && <p className='media-card-button__sub-name'>{subName}</p>}
			</div>
		</BaseButton>
	)
}

export default MediaCardButton
