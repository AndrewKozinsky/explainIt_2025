import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
import { fetchDictionaryArticle } from '@/widgets/dictionary/lib/fetchDictionaryArticle'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'

function PhraseDictionaryInput() {
	const inputText = usePhraseDictionaryStore((s) => s.inputText)

	function handleSubmit() {
		void fetchDictionaryArticle(inputText)
	}

	return (
		<TextInput
			currentText={inputText}
			inputProps={{
				placeholder: 'Слово для перевода...',
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
