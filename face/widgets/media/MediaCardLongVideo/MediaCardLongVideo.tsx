import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './MediaCardLongVideo.scss'

type MediaCardProps = {
	title?: null | string
	subTitle?: null | number | string
	theme?: null | string
	proficiencyLevel?: null | string
	duration?: null | string
	url: string
	coverUrl?: null | string
	defaultMediaName: string
}

function MediaCardLongVideo(props: MediaCardProps) {
	const { title, subTitle, theme, proficiencyLevel, duration, url, coverUrl, defaultMediaName } = props
	console.log(duration)

	return (
		<BaseButton href={url} extraClass='media-card-button' theme='outline'>
			<div className='media-card-button__cover' style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : '' }}>
				<div className='media-card-button__cover-shelf'>
					{theme ? <span className='media-card-button__brick'>{theme}</span> : <span />}
					{(proficiencyLevel || duration) && (
						<span className='media-card-button__brick media-card-button__brick-black'>
							{proficiencyLevel}
							{proficiencyLevel && duration && <span className='media-card-button__brick-divider' />}
							{duration}
						</span>
					)}
				</div>
			</div>
			<div className='media-card-button__text-wrapper'>
				{<p className='media-card-button__title'>{title ?? defaultMediaName}</p>}
				{subTitle && <p className='media-card-button__sub-title'>{subTitle}</p>}
			</div>
		</BaseButton>
	)
}

export default MediaCardLongVideo
