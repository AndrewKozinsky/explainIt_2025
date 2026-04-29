'use client'

import React from 'react'
import DictionaryFlashcardsList from './DictionaryFlashcardsList'
import DictionaryLanguageSwitch from './DictionaryLanguageSwitch'
import { usePopulateDictionaryStore } from './fn/usePopulateDictionaryStore'

function DictionaryItems() {
	usePopulateDictionaryStore()

	return (
		<div>
			<DictionaryLanguageSwitch />
			<DictionaryFlashcardsList />
		</div>
	)
}

export default DictionaryItems
