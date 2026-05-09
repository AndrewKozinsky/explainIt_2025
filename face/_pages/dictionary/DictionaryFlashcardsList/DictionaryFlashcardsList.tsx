'use client'

import React from 'react'
import { DictionaryFlashcard } from '../DictionaryFlashcard/DictionaryFlashcard'
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
			{flashcards.map((flashcard) => {
				return <DictionaryFlashcard key={flashcard.id} flashcard={flashcard} />
			})}
		</div>
	)
}

export default DictionaryFlashcardsList
