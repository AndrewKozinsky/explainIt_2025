import { useTranslations } from 'next-intl'
import UnderlinedInput from '@/shared/ui/formRelated/UnderlinedInput/UnderlinedInput'
import { fetchDictionaryArticle } from '@/widgets/dictionary/lib/fetchDictionaryArticle'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'

function PhraseDictionaryInput() {
	const t = useTranslations('dictionary')
	const inputText = usePhraseDictionaryStore((s) => s.inputText)

	function handleSubmit() {
		void fetchDictionaryArticle(inputText)
	}

	return (
		<UnderlinedInput
			inputProps={{
				placeholder: t('inputPlaceholder'),
				value: inputText ?? '',
				onChange: (e) => usePhraseDictionaryStore.getState().setInputText(e.target.value),
				onKeyDown: (e) => {
					if (e.key === 'Enter') {
						handleSubmit()
					}
				},
			}}
		/>
	)
}

export default PhraseDictionaryInput
