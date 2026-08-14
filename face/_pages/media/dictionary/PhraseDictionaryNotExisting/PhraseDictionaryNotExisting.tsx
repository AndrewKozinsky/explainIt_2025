import React from 'react'
import { usePhraseDictionaryStore } from '_pages/media/dictionary/phraseDictionaryStore'

function PhraseDictionaryNotExisting() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const nonExistentWord = usePhraseDictionaryStore((s) => s.nonExistentWord)

	if (status !== 'ready' || !nonExistentWord) {
		return null
	}

	return <div className='phrase-dictionary__status'>Такого слова не существует.</div>
}

export default PhraseDictionaryNotExisting
