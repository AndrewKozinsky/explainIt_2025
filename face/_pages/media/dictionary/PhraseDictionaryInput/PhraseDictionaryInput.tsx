import React from 'react'
import TextInput from 'ui/formRelated/TextInput/TextInput'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
import { usePhraseTranslation } from './fn/usePhraseTranslation'

function PhraseDictionaryInput() {
	const { handleSubmit } = usePhraseTranslation()

	const inputText = usePhraseDictionaryStore((s) => s.inputText)

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
