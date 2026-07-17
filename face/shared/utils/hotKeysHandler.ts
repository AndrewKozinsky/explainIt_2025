import { useEffect } from 'react'

type KeydownHandler = {
	key: ' ' | 'Enter' | 'ArrowLeft' | 'ArrowRight'
	handler: (e: KeyboardEvent) => void
}

function isEditableTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false

	const tag = target.tagName
	return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

function getKeyDown(keydownHandler: KeydownHandler) {
	return function (e: KeyboardEvent) {
		if (isEditableTarget(e.target)) return

		if (e.key === keydownHandler.key) {
			keydownHandler.handler(e)
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
