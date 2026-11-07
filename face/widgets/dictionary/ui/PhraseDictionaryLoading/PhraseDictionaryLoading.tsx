import { useTranslations } from 'next-intl'
import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'

function PhraseDictionaryLoading() {
	const t = useTranslations('dictionary')
	const status = usePhraseDictionaryStore((s) => s.status)

	if (status !== 'loading') {
		return null
	}

	return <div className='phrase-dictionary__status'>{t('loading')}</div>
}

export default PhraseDictionaryLoading
