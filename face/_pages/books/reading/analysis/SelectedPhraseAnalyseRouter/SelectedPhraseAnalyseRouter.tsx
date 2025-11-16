import React from 'react'
import { useGetSelectedPhrase } from '_pages/books/reading/lib/getSelectedPhraseType'
import LoadingPhraseAnalysis from '../LoadingPhraseAnalysis/LoadingPhraseAnalysis'
import ErrorPhraseAnalysis from '../ErrorPhraseAnalysis/ErrorPhraseAnalysis'
import TranslatedPhraseAnalysis from '../TranslatedPhraseAnalysis/TranslatedPhraseAnalysis'

function SelectedPhraseAnalyseRouter() {
	const selectedPhrase = useGetSelectedPhrase()
	if (!selectedPhrase) return null

	const mapper = {
		loading: <LoadingPhraseAnalysis />,
		error: <ErrorPhraseAnalysis />,
		success: <TranslatedPhraseAnalysis />,
	}

	return mapper[selectedPhrase.type]
}

export default SelectedPhraseAnalyseRouter
