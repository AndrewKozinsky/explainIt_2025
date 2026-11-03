import { filesUrls } from '@/shared/utils/filesUrls'
import './FeatureEmotions.scss'

// Портреты одного персонажа с разными эмоциями. Файлы подготовлены для ретины
const faces = [
	filesUrls.mainPage.features.emotionNeutral,
	filesUrls.mainPage.features.emotionCheerful,
	filesUrls.mainPage.features.emotionAnnoyed,
	filesUrls.mainPage.features.emotionSad,
]

// Сколько ещё эмоций есть у персонажа помимо показанных
const moreEmotionsCount = 8

/** Ряд портретов персонажа с разными эмоциями. Эмоции перечислены в тексте карточки, поэтому ряд — украшение */
function FeatureEmotions() {
	return (
		<div className='feature-emotions' aria-hidden='true'>
			{faces.map((facePath) => (
				// Обёртка обрезает квадратный портрет по кругу и рисует обводку
				<span className='feature-emotions__face' key={facePath}>
					<img
						className='feature-emotions__image'
						src={facePath}
						// Портреты подготовлены для ретины, поэтому показываются вдвое меньше своего размера
						srcSet={facePath + ' 2x'}
						alt=''
						loading='lazy'
					/>
				</span>
			))}
			<span className='feature-emotions__face feature-emotions__more'>+{moreEmotionsCount}</span>
		</div>
	)
}

export default FeatureEmotions
