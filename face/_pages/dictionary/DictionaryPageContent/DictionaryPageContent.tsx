'use client'

import React from 'react'
import DictionaryFlashcardsList from '../DictionaryFlashcardsList/DictionaryFlashcardsList'
import DictionaryLanguageSwitch from '../DictionaryLanguageSwitch/DictionaryLanguageSwitch'
import { usePopulateDictionaryStore } from './fn/usePopulateDictionaryStore'
import './DictionaryPageContent.scss'

function DictionaryPageContent() {
	usePopulateDictionaryStore()

	return (
		<div className='dictionary-page-content'>
			<DictionaryLanguageSwitch />
			<DictionaryFlashcardsList />
		</div>
	)
}

export default DictionaryPageContent
