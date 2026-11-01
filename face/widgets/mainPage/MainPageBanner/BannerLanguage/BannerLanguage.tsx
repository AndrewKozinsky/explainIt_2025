import { useTranslations } from 'next-intl'
import { LanguageCode, languageKeys } from '@/shared/utils/languages'
import { useLanguageTransition } from './fn/useLanguageTransition'
import './BannerLanguage.scss'

type BannerLanguageProps = {
	languageCode: LanguageCode
}

/** Меняющееся название языка внутри текста: старое уходит вверх, новое поднимается на его место */
function BannerLanguage(props: BannerLanguageProps) {
	const { currentCode, previousCode } = useLanguageTransition(props.languageCode)

	// Названия языков в той форме, в которой они стоят в заголовке
	const t = useTranslations('mainPageBanner.headerLanguages')

	// Экранный диктор читает все языки один раз, меняющееся слово от него скрыто
	const allLanguagesText = languageKeys.map((code) => t(code)).join(', ')

	return (
		<>
			<span className='banner-language' aria-hidden='true'>
				{previousCode && (
					<span className='banner-language__out' key={'out-' + previousCode}>
						{t(previousCode)}
					</span>
				)}
				<span className='banner-language__in' key={'in-' + currentCode}>
					{t(currentCode)}
				</span>
			</span>
			<span className='banner-language__visually-hidden'>{allLanguagesText}</span>
		</>
	)
}

export default BannerLanguage
