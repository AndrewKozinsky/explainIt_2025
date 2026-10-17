import { useState } from 'react'

export function useDialogueTextVisibility() {
	const [isTextVisible, setIsTextVisible] = useState(true)

	function toggleTextVisibility() {
		setIsTextVisible((visible) => !visible)
	}

	return { isTextVisible, toggleTextVisibility }
}
