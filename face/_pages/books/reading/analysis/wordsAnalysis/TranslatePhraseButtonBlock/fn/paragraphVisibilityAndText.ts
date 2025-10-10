import { useGetIdlePhraseIsSelectedSentence, useGetSelectedSentence } from '_pages/books/reading/logic'
import React from 'react'
import { isMacOS } from 'utils/utils'

export function useGetHintVisibilityAndText() {
	const idlePhrase = useGetIdlePhraseIsSelectedSentence()

	const isHintVisible = React.useMemo(() => {
		return !!idlePhrase
	}, [idlePhrase])

	const paragraphText = React.useMemo(() => {
		if (!idlePhrase) return ''

		return isMacOS()
			? 'Зажмите cmd для выделения нескольких связанных слов.'
			: 'Зажмите ctrl для выделения нескольких слов.'
	}, [idlePhrase])

	return { isHintVisible, hintText: paragraphText }
}
