import { LanguageCode } from '@/shared/utils/languages'
// import DictionaryPhraseTranscription from '../DictionaryPhraseTranscription/DictionaryPhraseTranscription'
// import PhraseDictionaryError from '../PhraseDictionaryError/PhraseDictionaryError'
// import PhraseDictionaryInput from '../PhraseDictionaryInput/PhraseDictionaryInput'
// import PhraseDictionaryLoading from '../PhraseDictionaryLoading/PhraseDictionaryLoading'
// import PhraseDictionaryNotExisting from '../PhraseDictionaryNotExisting/PhraseDictionaryNotExisting'
// import PhraseTranslationResult from '../PhraseTranslationResult/PhraseTranslationResult'
// import WordsQuickAccess from '../WordsQuickAccess/WordsQuickAccess'
// import { useInitStore } from './fn/useInitStore'
// import { useObservePhrase } from './fn/useObservePhrase'
// import { useRetryEffect } from './fn/useRetryEffect'
import './PhraseDictionary.scss'

type PhraseDictionaryProps = {
	languageCode: LanguageCode
	currentWord?: string
	words: string[]
}

function PhraseDictionary(props: PhraseDictionaryProps) {
	const { languageCode, currentWord, words } = props

	// useInitStore(languageCode)
	// useObservePhrase(currentWord)
	// useRetryEffect()
	console.log(currentWord)

	/*return (
		<div className='phrase-dictionary'>
			<WordsQuickAccess words={words} />
			<PhraseDictionaryInput />
			<DictionaryPhraseTranscription />
			<PhraseDictionaryLoading />
			<PhraseDictionaryError />
			<PhraseDictionaryNotExisting />
			<PhraseTranslationResult />
		</div>
	)*/
	return null
}

export default PhraseDictionary
