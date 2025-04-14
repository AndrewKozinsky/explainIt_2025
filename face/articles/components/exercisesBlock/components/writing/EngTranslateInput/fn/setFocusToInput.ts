import React, { useEffect } from 'react'

/**
 * Хук при изменении упражнения ставит фокус на поле ввода и стирает существующее значение.
 * @param inputRef — ссылка на поле ввода перевода.
 */
export function usePrepareInput(inputRef: React.MutableRefObject<HTMLTextAreaElement | null>) {
	useEffect(function () {
		if (!inputRef.current) return

		inputRef.current.value = ''
	}, [])
}
