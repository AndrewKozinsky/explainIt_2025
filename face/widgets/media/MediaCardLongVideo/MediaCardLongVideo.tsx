import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './MediaCardLongVideo.scss'
import { HideIcon } from '@/shared/ui/icons/HideIcon'

type MediaCardProps = {
	title?: null | string
	duration?: null | string
}

function MediaCardLongVideo(props: MediaCardProps) {
	const { title, duration } = props

	return (
		<div className='media-card-button-long-video'>
			<div className='media-card-button-long-video__cover'>
				<HideIcon />
				<p>Видео больше 60 минут пока не&nbsp;поддерживаются</p>
				<div className='media-card-button-long-video__cover-shelf'>
					<span className='media-card-button-long-video__brick'>{duration}</span>
				</div>
			</div>
			<div className='media-card-button-long-video__text-wrapper'>
				{<p className='media-card-button-long-video__title'>{title}</p>}
			</div>
		</div>
	)
}

export default MediaCardLongVideo
