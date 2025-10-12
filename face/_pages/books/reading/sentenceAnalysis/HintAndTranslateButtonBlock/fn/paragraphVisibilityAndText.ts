import { useGetIdlePhraseFromSelectedSentence, useGetSelectedSentence } from '_pages/books/reading/logic'
import React from 'react'
import { isMacOS } from 'utils/utils'

export function useGetHintVisibility() {
	const idlePhrase = useGetIdlePhraseFromSelectedSentence()

	return React.useMemo(() => {
		return !!idlePhrase
	}, [idlePhrase])
}

export function useGetHintText() {
	const idlePhrase = useGetIdlePhraseFromSelectedSentence()

	return React.useMemo(() => {
		if (!idlePhrase) return 'Укажите слово для перевода.'

		return isMacOS()
			? 'Зажмите cmd для выделения нескольких связанных слов.'
			: 'Зажмите ctrl для выделения нескольких слов.'
	}, [idlePhrase])
}
