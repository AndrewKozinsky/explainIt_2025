import type { MouseEvent } from 'react'
import { type DialogueAudioAddress, getDialogueAudioKey } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { useDialogueAudio } from '../DialogueAudioContext'

export function useDialogueAudioButton(address: DialogueAudioAddress) {
	const audio = useDialogueAudio()
	if (!audio) return null

	const { player, state } = audio
	const key = getDialogueAudioKey(address)
	const requestStatus = state.requestStatuses.get(key)
	const isSelected = state.selectedKey === key
	const isPlaying = isSelected && (state.playbackStatus === 'playing' || state.playbackStatus === 'loading')
	const isLoading = (isSelected && state.playbackStatus === 'loading') || requestStatus === 'loading'
	const hasError = requestStatus === 'failed' || (isSelected && state.playbackStatus === 'error')

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		player.toggle(address)
	}

	return {
		isPlaying,
		isLoading,
		hasError,
		text: getButtonText(isPlaying, hasError),
		handleClick,
	}
}

function getButtonText(isPlaying: boolean, hasError: boolean) {
	if (isPlaying) return 'Остановить'
	if (hasError) return 'Не удалось озвучить. Повторить'
	return 'Озвучить'
}
