import { useTranslations } from 'next-intl'
import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'

function PhraseDictionaryNotExisting() {
	const t = useTranslations('dictionary')
	const status = usePhraseDictionaryStore((s) => s.status)
	const nonExistentWord = usePhraseDictionaryStore((s) => s.nonExistentWord)

	if (status !== 'ready' || !nonExistentWord) {
		return null
	}

	return <div className='phrase-dictionary__status'>{t('notExisting')}</div>
}

export default PhraseDictionaryNotExisting
