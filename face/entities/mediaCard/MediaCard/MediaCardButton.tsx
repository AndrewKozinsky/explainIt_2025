import type { ReactNode } from 'react'
import cn from 'classnames'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './MediaCardButton.scss'

type MediaCardProps = {
	title?: null | string
	subTitle?: null | number | string
	theme?: null | string
	proficiencyLevel?: null | string
	duration?: null | string
	url?: null | string
	coverUrl?: null | string
	defaultMediaName: string
	size?: 'small' | 'medium'
	onClick?: () => void
	disabled?: boolean
	extraClass?: string
	'aria-label'?: string
	/** Содержимое поверх обложки, например индикатор выполнения действия. */
	coverOverlay?: ReactNode
}

function MediaCardButton(props: MediaCardProps) {
	const {
		title,
		subTitle,
		theme,
		proficiencyLevel,
		duration,
		url,
		coverUrl,
		defaultMediaName,
		size = 'medium',
		onClick,
		disabled,
		extraClass,
		'aria-label': ariaLabel,
		coverOverlay,
	} = props

	return (
		<BaseButton
			href={url ?? undefined}
			onClick={onClick}
			extraClass={cn('media-card-button', `media-card-button--${size}`, extraClass)}
			theme='outline'
			disabled={disabled}
			aria-label={ariaLabel}
		>
			<div className='media-card-button__cover' style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : '' }}>
				<div className='media-card-button__cover-shelf'>
					{theme ? (
						<span className='media-card-button__brick media-card-button__brick--hidden-overflow'>
							{theme}
						</span>
					) : (
						<span />
					)}
					{(proficiencyLevel || duration) && (
						<span className='media-card-button__brick media-card-button__brick--black'>
							{proficiencyLevel}
							{proficiencyLevel && duration && <span className='media-card-button__brick-divider' />}
							{duration}
						</span>
					)}
				</div>
				{coverOverlay}
			</div>
			<div className='media-card-button__text-wrapper'>
				{<p className='media-card-button__title'>{title ?? defaultMediaName}</p>}
				{subTitle && <p className='media-card-button__sub-title'>{subTitle}</p>}
			</div>
		</BaseButton>
	)
}

export default MediaCardButton
