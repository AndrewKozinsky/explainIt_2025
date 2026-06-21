import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { usePhraseDictionaryStore } from '_pages/media/dictionary/phraseDictionaryStore'
import './PhraseDictionaryError.scss'

function PhraseDictionaryError() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const error = usePhraseDictionaryStore((s) => s.error)

	if (status !== 'error') {
		return null
	}

	function handleRetry() {
		usePhraseDictionaryStore.getState().triggerRetry()
	}

	return (
		<div className='phrase-dictionary-error'>
			<div className='phrase-dictionary-error__message'>
				<ErrorMessage text={error} />
			</div>
			<Button type='button' size='small' theme='outline' onClick={handleRetry}>
				Повторить
			</Button>
		</div>
	)
}

export default PhraseDictionaryError
