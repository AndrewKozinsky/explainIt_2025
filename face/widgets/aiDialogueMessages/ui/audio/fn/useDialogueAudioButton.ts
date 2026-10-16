import type { MouseEvent } from 'react'
import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { useDialogueAudio } from '../DialogueAudioContext'

export function useDialogueAudioButton(address: DialogueAudioAddress) {
	const audio = useDialogueAudio()
	if (!audio) return null

	const player = audio.player

	const item = player.findItem(address)
	const selected = item?.id === audio.state.selectedId
	const playing = selected && (audio.state.playbackStatus === 'playing' || audio.state.playbackStatus === 'loading')
	const failed = Boolean(item && ['failed', 'outcomeUnknown', 'cancelled'].includes(item.status))
	const waiting = !item || item.status === 'queued' || item.status === 'generating'
	const loading = waiting || (selected && audio.state.playbackStatus === 'loading')
	const downloadError = Boolean(item && audio.state.loadErrors.has(item.id))
	const text = getButtonText(failed, playing, downloadError)

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		if (item) player.toggle(item.id)
	}

	return {
		playing,
		loading,
		hasWarning: failed || downloadError,
		text,
		disabled: Boolean(failed || waiting || !item?.url),
		handleClick,
	}
}

function getButtonText(failed: boolean, playing: boolean, error: boolean) {
	if (failed) return 'Озвучка недоступна'
	if (playing) return 'Остановить'
	if (error) return 'Повторить загрузку'
	return 'Озвучить'
}
