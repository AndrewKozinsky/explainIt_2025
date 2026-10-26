import cn from 'classnames'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import Spinner from '@/shared/ui/Spinner/Spinner'
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
	/** Показывает индикатор поверх обложки и блокирует действие карточки. */
	loading?: boolean
	loadingLabel?: string
	extraClass?: string
	'aria-label'?: string
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
		loading = false,
		loadingLabel = 'Загрузка',
		extraClass,
		'aria-label': ariaLabel,
	} = props

	return (
		<BaseButton
			href={url ?? undefined}
			onClick={onClick}
			extraClass={cn('media-card-button', `media-card-button--${size}`, extraClass)}
			theme='outline'
			disabled={disabled || loading}
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
				{loading && <LoadingIndicator label={loadingLabel} />}
			</div>
			<div className='media-card-button__text-wrapper'>
				{<p className='media-card-button__title'>{title ?? defaultMediaName}</p>}
				{subTitle && <p className='media-card-button__sub-title'>{subTitle}</p>}
			</div>
		</BaseButton>
	)
}

function LoadingIndicator({ label }: { label: string }) {
	return (
		<span className='media-card-button__loading' role='status' aria-label={label}>
			<Spinner size='small' />
		</span>
	)
}

export default MediaCardButton
