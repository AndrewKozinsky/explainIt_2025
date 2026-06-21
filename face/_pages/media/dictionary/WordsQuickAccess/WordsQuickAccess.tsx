import React from 'react'
import WordsButtonList from '_pages/media/commonComponents/WordsButtonList/WordsButtonList'
import { usePhraseTranslation } from '../PhraseDictionaryInput/fn/usePhraseTranslation'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'

function WordsQuickAccess() {
	const { handleSubmit } = usePhraseTranslation()

	function handleWordAppend(word: string) {
		const currentText = usePhraseDictionaryStore.getState().inputText
		const newText = currentText.trim() ? `${currentText} ${word}` : word
		usePhraseDictionaryStore.getState().setInputText(newText)
		handleSubmit()
	}

	function handlePhraseReplace(phraseText: string) {
		usePhraseDictionaryStore.getState().setInputText(phraseText)
		handleSubmit()
	}

	return <WordsButtonList onWordClick={handleWordAppend} onPhraseClick={handlePhraseReplace} />
}

export default WordsQuickAccess
