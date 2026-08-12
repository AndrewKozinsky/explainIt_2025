import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './MediaCardLongVideo.scss'

type MediaCardProps = {
	title?: null | string
	duration?: null | string
	url: string
}

function MediaCardLongVideo(props: MediaCardProps) {
	const { title, duration, url } = props

	return (
		<BaseButton href={url} extraClass='media-card-button' theme='outline'>
			<div className='media-card-button__cover'>
				<div className='media-card-button__cover-shelf'>{duration}</div>
			</div>
			<div className='media-card-button__text-wrapper'>{<p className='media-card-button__title'>{title}</p>}</div>
		</BaseButton>
	)
}

export default MediaCardLongVideo
