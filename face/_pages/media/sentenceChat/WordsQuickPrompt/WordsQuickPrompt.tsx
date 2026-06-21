import React from 'react'
import WordsButtonList from '_pages/media/commonComponents/WordsButtonList/WordsButtonList'
import { useSentenceChatStore } from '../sentenceChatStore'

function WordsQuickPrompt() {
	function handleWordAppend(word: string) {
		const currentPrompt = useSentenceChatStore.getState().prompt
		const newPrompt = currentPrompt.trim() ? `${currentPrompt} ${word}` : word
		useSentenceChatStore.getState().setPrompt(newPrompt)
	}

	function handlePhraseAppend(phraseText: string) {
		const currentPrompt = useSentenceChatStore.getState().prompt
		const newPrompt = currentPrompt.trim() ? `${currentPrompt} ${phraseText}` : phraseText
		useSentenceChatStore.getState().setPrompt(newPrompt)
	}

	return <WordsButtonList onWordClick={handleWordAppend} onPhraseClick={handlePhraseAppend} />
}

export default WordsQuickPrompt
