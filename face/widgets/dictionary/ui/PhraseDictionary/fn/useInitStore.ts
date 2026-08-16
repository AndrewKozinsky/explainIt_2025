import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { LanguageCode } from '@/shared/utils/languages'
import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'

export function useInitStore(languageCode: LanguageCode) {
	const locale = useLocale()

	useEffect(
		function () {
			usePhraseDictionaryStore.setState({ languageCode, targetLanguageCode: locale })
		},
		[languageCode, locale],
	)
}
