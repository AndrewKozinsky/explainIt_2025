import React from 'react'
import { useGetSelectedSentence } from '_pages/books/reading/logic'
import './SentenceTranslationBlock.scss'

function SentenceTranslationBlock() {
	const sentence = useGetSelectedSentence()

	if (!sentence || !sentence.translation) {
		return null
	}

	return <p className='sentence-translation'>{sentence.translation}</p>
}

export default SentenceTranslationBlock
