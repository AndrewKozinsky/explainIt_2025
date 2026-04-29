'use client'

import React from 'react'
import { useDictionaryStore } from '../dictionaryStore'
import './DictionaryFlashcardsList.scss'

function DictionaryFlashcardsList() {
	const flashcards = useDictionaryStore((state) => state.flashcards)
	const isFlashcardsLoading = useDictionaryStore((state) => state.isFlashcardsLoading)
	const getFlashcardsErrorMessage = useDictionaryStore((state) => state.getFlashcardsErrorMessage)

	if (isFlashcardsLoading) {
		return <div>Загрузка карточек...</div>
	}

	if (getFlashcardsErrorMessage) {
		return <div>{getFlashcardsErrorMessage}</div>
	}

	if (!flashcards.length) {
		return <div>Вы не добавили ни одного элемента.</div>
	}

	return (
		<div className='dictionary-flashcards-list'>
			{flashcards.map((flashcard) => (
				<div className='dictionary-flashcard' key={flashcard.id}>
					<div className='dictionary-flashcard__sentence'>
						<p className='dictionary-flashcard__sentence-text'>{flashcard.sentenceText}</p>
						<p className='dictionary-flashcard__sentence-translate'>{flashcard.sentenceTranslation}</p>
					</div>

					<div>{flashcard.phraseStartOffset}</div>
					<div>{flashcard.sentenceTranslation}</div>
					<div>{flashcard.phrase}</div>
					<div>{flashcard.phraseTranscription}</div>
					<div>{flashcard.phraseAudioUrl}</div>
					<div>{flashcard.phraseTranslation}</div>
					<div>
						{flashcard.examples.map((example, index) => (
							<div key={index}>
								<div>{example.text}</div>
								<div>{example.translate}</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default DictionaryFlashcardsList
