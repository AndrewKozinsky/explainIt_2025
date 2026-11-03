import { useTranslations } from 'next-intl'
import './FeatureContextWord.scss'

/** Фраза с выделенным словом и выражение, которое словарь покажет вместе с соседними словами */
function FeatureContextWord() {
	const t = useTranslations('mainPageFeatures')

	return (
		<p className='feature-context-word' lang={t('learnedLang')}>
			{t.rich('dictionary.phrase', {
				word: (chunks) => <mark className='feature-context-word__word'>{chunks}</mark>,
			})}{' '}
			→ {t('dictionary.meaning')}
		</p>
	)
}

export default FeatureContextWord
