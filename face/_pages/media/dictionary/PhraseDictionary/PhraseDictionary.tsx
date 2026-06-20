import React from 'react'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import DictionaryPhraseTranscription from '_pages/media/dictionary/DictionaryPhraseTranscription/DictionaryPhraseTranscription'
import PhraseDictionaryLoading from '_pages/media/dictionary/PhraseDictionaryLoading/PhraseDictionaryLoading'
import PhraseDictionaryNotExisting from '_pages/media/dictionary/PhraseDictionaryNotExisting/PhraseDictionaryNotExisting'
import PhraseDictionaryError from '../PhraseDictionaryError/PhraseDictionaryError'
import PhraseDictionaryInput from '../PhraseDictionaryInput/PhraseDictionaryInput'
import PhraseTranslationResult from '../PhraseTranslationResult/PhraseTranslationResult'
import './PhraseDictionary.scss'

function PhraseDictionary() {
	const languageCode = useDetailsStore((s) => s.languageCode)

	if (!languageCode) {
		return null
	}

	return (
		<div className='phrase-dictionary'>
			<PhraseDictionaryInput />
			<DictionaryPhraseTranscription />
			<PhraseDictionaryLoading />
			<PhraseDictionaryError />
			<PhraseDictionaryNotExisting />
			<PhraseTranslationResult />
		</div>
	)
}

export default PhraseDictionary
