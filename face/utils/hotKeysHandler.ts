import { useEffect } from 'react'

type KeydownHandler = {
	key: string
	handler: () => void
}

function getKeyDown(keydownHandler: KeydownHandler) {
	return function (e: KeyboardEvent) {
		if (e.key === keydownHandler.key) {
			keydownHandler.handler()
		}
	}
}

export function useGetHotKeysHandler(keydownHandler: KeydownHandler) {
	useEffect(
		function () {
			const keyDown = getKeyDown(keydownHandler)

			document.addEventListener('keydown', keyDown)

			return function () {
				document.removeEventListener('keydown', keyDown)
			}
		},
		[keydownHandler],
	)
}
