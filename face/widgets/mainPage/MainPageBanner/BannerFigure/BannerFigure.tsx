import cn from 'classnames'
import { LanguageCode } from '@/shared/utils/languages'
import { getFigureCaptionText } from './fn/figureScenes'
import { useFigureImages } from './fn/useFigureImages'
import './BannerFigure.scss'

type BannerFigureProps = {
	languageCode: LanguageCode
	// Язык, который будет следующим. Его картинка загружается заранее
	nextLanguageCode?: LanguageCode
	// Размер и положение задаёт родитель. Он же должен сделать элемент позиционированным
	extraClass?: string
}

/** Картинка баннера, передающая дух языка, с плавной сменой и подписью в углу */
function BannerFigure(props: BannerFigureProps) {
	const { languageCode, nextLanguageCode, extraClass } = props

	const { activeImage, renderedImages } = useFigureImages(languageCode, nextLanguageCode)

	return (
		<figure className={cn('banner-figure', extraClass)}>
			{renderedImages.map(function (image) {
				const isActive = image === activeImage

				return (
					<img
						className={cn('banner-figure__image', isActive && 'banner-figure__image--active')}
						src={image.src}
						width={1428}
						height={888}
						alt={isActive ? image.alt : ''}
						key={image.src}
					/>
				)
			})}
			<figcaption className='banner-figure__caption'>
				<p className='banner-figure__caption-title'>{activeImage.place}</p>
				<p className='banner-figure__caption-text'>{getFigureCaptionText(languageCode)}</p>
			</figcaption>
		</figure>
	)
}

export default BannerFigure
