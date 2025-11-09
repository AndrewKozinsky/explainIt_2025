import React from 'react'
import { useIsShowPressEnterVisible } from '_pages/books/readingNext/analysis/HintBlock/fn/isShowPressEnterVisible'
import { HotKeyButton } from './details'

export function PressEnterForTranslation() {
	const isVisible = useIsShowPressEnterVisible()
	if (!isVisible) return null

	return (
		<div className='hint-block__text-block'>
			{'Нажмите '}
			<HotKeyButton text='Enter ↩' />
			{' для перевода'}
		</div>
	)
}
