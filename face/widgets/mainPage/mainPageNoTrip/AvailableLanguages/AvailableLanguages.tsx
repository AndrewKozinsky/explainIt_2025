import { useLocale, useTranslations } from 'next-intl'
import { filesUrls } from '@/shared/utils/filesUrls'
import { useLanguagesToLearn } from '@/shared/utils/useLanguagesToLearn'
import './AvailableLanguages.scss'

/** Флаги языков, которые можно изучать. Язык интерфейса в список не входит */
function AvailableLanguages() {
	const t = useTranslations('mainPageNoTrip')
	const locale = useLocale()
	const languagesToLearn = useLanguagesToLearn()

	// Названия языков на языке интерфейса для подписей флагов
	const languageNames = new Intl.DisplayNames(locale, { type: 'language' })

	return (
		<p className='available-languages'>
			{t('languagesLabel')}
			{languagesToLearn.map((code) => {
				const flagPath = filesUrls.images.flags[code]

				return (
					<img
						className='available-languages__flag'
						src={flagPath}
						srcSet={flagPath + ' 2x'}
						alt={languageNames.of(code)}
						key={code}
					/>
				)
			})}
		</p>
	)
}

export default AvailableLanguages
