import { useEffect } from 'react'
import { isMacOS } from 'utils/utils'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useWatchingStore } from '../../watchingStore'

/**
 * В Хранилище есть булево значение isWordsAddingModeEnabled.
 * Оно показывает что делать если пользователь нажимает на слово в предложении: нужно или добавлять их к уже выделенным словам или заменить предыдущие.
 * Если пользователь работает с сайтом на стандартном мониторе, то для выделения нескольких слов должен нажать клавишу Cmd.
 * Поэтому в зависимости от этого меняется значение isWordsAddingModeEnabled в Хранилище.
 */
export function useRegisterCmdKeyListener() {
	const changeWordsAddingMode = useWatchingStore((s) => s.changeWordsAddingMode)

	useEffect(
		function () {
			const isMac = isMacOS()

			function changeAddingModeDependsOnPressedKey(e: KeyboardEvent) {
				const isKeyPressed = isMac ? e.metaKey : e.ctrlKey
				changeWordsAddingMode(isKeyPressed)
			}

			function clearAddingMode() {
				changeWordsAddingMode(false)
			}

			window.addEventListener('keydown', changeAddingModeDependsOnPressedKey)
			window.addEventListener('keyup', clearAddingMode)

			return () => {
				window.removeEventListener('keydown', changeAddingModeDependsOnPressedKey)
				window.removeEventListener('keyup', clearAddingMode)
				changeWordsAddingMode(false)
			}
		},
		[changeWordsAddingMode],
	)
}
