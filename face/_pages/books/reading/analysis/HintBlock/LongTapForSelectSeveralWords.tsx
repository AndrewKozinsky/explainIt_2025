import { useIsHoldToSelectRelatedWordsVisible } from './fn/isHoldToSelectRelatedWordsVisible'
import React from 'react'

function LongTapForSelectSeveralWords() {
	const isVisible = useIsHoldToSelectRelatedWordsVisible()
	if (!isVisible) return null

	return <div className='hint-block__text-block'>Для добавления ещё одного слова в перевод удерживайте палец.</div>
}

export default LongTapForSelectSeveralWords
