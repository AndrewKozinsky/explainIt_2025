import { useState } from 'react'
import { useDialogueTextVisibilityStore } from '@/widgets/aiDialogueMessages/model/textVisibilityStore'

export function useDialogueTextVisibility(key: string | undefined, actionIndex: number) {
	// Unvoiced user messages retain their independent local visibility.
	const [localVisible, setLocalVisible] = useState(true)
	const storedVisible = useDialogueTextVisibilityStore((state) => {
		const message = key ? state.visibility.get(key) : undefined
		return message ? (message.blocks[actionIndex] ?? message.initialVisible) : true
	})
	const toggleBlock = useDialogueTextVisibilityStore((state) => state.toggleBlock)

	function toggleTextVisibility() {
		if (key) toggleBlock(key, actionIndex)
		else setLocalVisible((visible) => !visible)
	}

	return { isTextVisible: key ? storedVisible : localVisible, toggleTextVisibility }
}
