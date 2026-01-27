import { useEffect } from 'react'
import { useSystemStore } from 'stores/systemStore'
import { isMacOS } from 'utils/utils'

export function useRegisterCmdKeyListener() {
	const setIsCmdKeyPressed = useSystemStore((s) => s.setIsCmdKeyPressed)

	useEffect(
		function () {
			const isMac = isMacOS()

			function updateModeDependsOnPressedKey(e: KeyboardEvent) {
				const isKeyPressed = isMac ? e.metaKey : e.ctrlKey
				setIsCmdKeyPressed(isKeyPressed)
			}

			function clearMode() {
				setIsCmdKeyPressed(false)
			}

			function clearModeIfHidden() {
				if (document.hidden) {
					clearMode()
				}
			}

			window.addEventListener('keydown', updateModeDependsOnPressedKey)
			window.addEventListener('keyup', updateModeDependsOnPressedKey)
			window.addEventListener('blur', clearMode)
			window.addEventListener('focus', clearMode)
			document.addEventListener('visibilitychange', clearModeIfHidden)

			return () => {
				window.removeEventListener('keydown', updateModeDependsOnPressedKey)
				window.removeEventListener('keyup', updateModeDependsOnPressedKey)
				window.removeEventListener('blur', clearMode)
				window.removeEventListener('focus', clearMode)
				document.removeEventListener('visibilitychange', clearModeIfHidden)
				setIsCmdKeyPressed(false)
			}
		},
		[setIsCmdKeyPressed],
	)
}
