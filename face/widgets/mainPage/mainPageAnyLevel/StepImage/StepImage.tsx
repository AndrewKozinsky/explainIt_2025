import cn from 'classnames'
import './StepImage.scss'

type StepImageProps = {
	// Иллюстрация для ретины: показывается вдвое меньше своего размера
	imagePath: string
	extraClass?: string
}

/** Иллюстрация шага: прижата к верху, всё, что ниже карточки, отсекается */
function StepImage(props: StepImageProps) {
	const { imagePath, extraClass } = props

	return (
		<div className={cn('any-level-step-image', extraClass)}>
			<img
				className='any-level-step-image__image'
				src={imagePath}
				srcSet={imagePath + ' 2x'}
				alt=''
				loading='lazy'
			/>
		</div>
	)
}

export default StepImage
