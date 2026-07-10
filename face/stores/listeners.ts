import { isMacOS } from 'utils/utils'

type KeyboardListenersConfig = {
	setIsCmdKeyPressed: (value: boolean) => void
}

export function registerKeyboardListeners(config: KeyboardListenersConfig): void {
	const { setIsCmdKeyPressed } = config
	const isMac = isMacOS()

	function updateModeDependsOnPressedKey(e: KeyboardEvent): void {
		const isKeyPressed = isMac ? e.metaKey : e.ctrlKey
		setIsCmdKeyPressed(isKeyPressed)
	}

	function clearMode(): void {
		setIsCmdKeyPressed(false)
	}

	function clearModeIfHidden(): void {
		if (document.hidden) {
			clearMode()
		}
	}

	window.addEventListener('keydown', updateModeDependsOnPressedKey)
	window.addEventListener('keyup', updateModeDependsOnPressedKey)
	window.addEventListener('blur', clearMode)
	window.addEventListener('focus', clearMode)
	document.addEventListener('visibilitychange', clearModeIfHidden)
}
