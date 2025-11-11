import React from 'react'
import { useCanRunTranslation } from '_pages/books/readingNext/lib/canRunTranslation'
import { HotKeyButton } from './details'

export function PressEnterForTranslation() {
	const isVisible = useCanRunTranslation()
	if (!isVisible) return null

	return (
		<div className='hint-block__text-block'>
			{'Нажмите '}
			<HotKeyButton text='Enter ↩' />
			{' для перевода'}
		</div>
	)
}
