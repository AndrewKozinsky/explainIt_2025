import { Fragment } from 'react'
import { filesUrls } from '@/shared/utils/filesUrls'
import './FeaturePlots.scss'

// Иконки сюжетов разного размера
const plotIconPaths = [
	filesUrls.mainPage.features.plotCafe,
	filesUrls.mainPage.features.plotTicket,
	filesUrls.mainPage.features.plotClothes,
	filesUrls.mainPage.features.plotApple,
	filesUrls.mainPage.features.plotCircus,
]

/** Ряд иконок сюжетов, разделённых точками. Сюжеты перечислены в тексте карточки, поэтому ряд — украшение */
function FeaturePlots() {
	return (
		<div className='feature-plots' aria-hidden='true'>
			{plotIconPaths.map((iconPath, i) => (
				<Fragment key={iconPath}>
					{i > 0 && <span className='feature-plots__dot' />}
					<img
						className='feature-plots__icon'
						src={iconPath}
						// Иконки подготовлены для ретины, поэтому показываются вдвое меньше своего размера
						srcSet={iconPath + ' 2x'}
						alt=''
						loading='lazy'
					/>
				</Fragment>
			))}
		</div>
	)
}

export default FeaturePlots
