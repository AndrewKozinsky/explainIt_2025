import React from 'react'
import PhraseAnalysis from '../PhraseAnalysis/PhraseAnalysis'
import { useGetPhrases } from './fn/getPhrases'

function PhrasesBlock() {
	const phrases = useGetPhrases()

	return phrases.map((phrase) => {
		return <PhraseAnalysis key={JSON.stringify(phrase.wordIds)} phrase={phrase} />
	})
}

export default PhrasesBlock
