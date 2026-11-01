import cn from 'classnames'
import { useTranslations } from 'next-intl'
import { LanguageCode } from '@/shared/utils/languages'
import { figureImagePaths } from './fn/figureImagePaths'
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

	const t = useTranslations('mainPageBanner')
	const renderedCodes = useFigureImages(languageCode, nextLanguageCode)

	return (
		<figure className={cn('banner-figure', extraClass)}>
			{renderedCodes.map(function (code) {
				const isActive = code === languageCode

				return (
					<img
						className={cn('banner-figure__image', isActive && 'banner-figure__image--active')}
						src={figureImagePaths[code]}
						width={1428}
						height={888}
						alt={isActive ? t(`scenes.${code}.alt`) : ''}
						key={code}
					/>
				)
			})}
			<figcaption className='banner-figure__caption'>
				<p className='banner-figure__caption-title'>{t(`scenes.${languageCode}.place`)}</p>
				<p className='banner-figure__caption-text'>
					{t('caption', { language: t(`captionLanguages.${languageCode}`) })}
				</p>
			</figcaption>
		</figure>
	)
}

export default BannerFigure
