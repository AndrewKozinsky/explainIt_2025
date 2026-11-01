import { LanguageCode } from '@/shared/utils/languages'
import { languageNames } from './fn/languageNames'
import { useLanguageTransition } from './fn/useLanguageTransition'
import './BannerLanguage.scss'

// Экранный диктор читает все языки один раз, меняющееся слово от него скрыто
const allLanguagesText = Object.values(languageNames).join(', ')

type BannerLanguageProps = {
	languageCode: LanguageCode
}

/** Меняющееся название языка внутри текста: старое уходит вверх, новое поднимается на его место */
function BannerLanguage(props: BannerLanguageProps) {
	const { currentCode, previousCode } = useLanguageTransition(props.languageCode)

	return (
		<>
			<span className='banner-language' aria-hidden='true'>
				{previousCode && (
					<span className='banner-language__out' key={'out-' + previousCode}>
						{languageNames[previousCode]}
					</span>
				)}
				<span className='banner-language__in' key={'in-' + currentCode}>
					{languageNames[currentCode]}
				</span>
			</span>
			<span className='banner-language__visually-hidden'>{allLanguagesText}</span>
		</>
	)
}

export default BannerLanguage
