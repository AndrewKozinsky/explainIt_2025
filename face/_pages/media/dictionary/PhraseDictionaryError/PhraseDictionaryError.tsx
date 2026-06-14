import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { usePhraseDictionaryStore } from '_pages/media/dictionary/phraseDictionaryStore'

function PhraseDictionaryError() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const error = usePhraseDictionaryStore((s) => s.error)

	if (status !== 'error') {
		return null
	}

	return <ErrorMessage text={error} />
}

export default PhraseDictionaryError
