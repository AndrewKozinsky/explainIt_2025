import { getHotKeyName, useIsHoldToSelectRelatedWordsVisible } from './fn/isHoldToSelectRelatedWordsVisible'
import React from 'react'
import { HotKeyButton } from './details'

export function HoldToSelectRelatedWords() {
	const isVisible = useIsHoldToSelectRelatedWordsVisible()
	if (!isVisible) return null

	return (
		<div className='hint-block__text-block'>
			{'Зажмите '}
			<HotKeyButton text={getHotKeyName()} />
			{' для выделения связанных слов'}
		</div>
	)
}
