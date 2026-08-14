import React from 'react'
import { usePhraseDictionaryStore } from '_pages/media/dictionary/phraseDictionaryStore'

function PhraseDictionaryLoading() {
	const status = usePhraseDictionaryStore((s) => s.status)

	if (status !== 'loading') {
		return null
	}

	return <div className='phrase-dictionary__status'>Загрузка перевода...</div>
}

export default PhraseDictionaryLoading
