import type { MouseEvent } from 'react'
import { useTranslations } from 'next-intl'
import { type DialogueAudioAddress, getDialogueAudioKey } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { useIsBalanceExhausted } from '@/entities/user/fn/useIsBalanceExhausted'
import { useDialogueAudio } from '../DialogueAudioContext'

export function useDialogueAudioButton(address: DialogueAudioAddress) {
	const audio = useDialogueAudio()
	const t = useTranslations('aiDialogueMessages.audio')
	const isBalanceExhausted = useIsBalanceExhausted()
	if (!audio) return null

	const { player, state } = audio
	const key = getDialogueAudioKey(address)
	const requestStatus = state.requestStatuses.get(key)
	const isSelected = state.selectedKey === key
	const isPlaying = isSelected && (state.playbackStatus === 'playing' || state.playbackStatus === 'loading')
	const isLoading = (isSelected && state.playbackStatus === 'loading') || requestStatus === 'loading'
	const hasError = requestStatus === 'failed' || (isSelected && state.playbackStatus === 'error')
	// Без баланса озвучка недоступна целиком, даже уже готовая; остановить играющую можно.
	const isUnavailable = isBalanceExhausted && !isPlaying

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		player.toggle(address)
	}

	return {
		isPlaying,
		isLoading,
		hasError,
		isUnavailable,
		text: t(getButtonTextKey(isPlaying, hasError, isUnavailable)),
		handleClick,
	}
}

function getButtonTextKey(isPlaying: boolean, hasError: boolean, isUnavailable: boolean) {
	if (isPlaying) return 'stop'
	if (isUnavailable) return 'limitReached'
	if (hasError) return 'failed'
	return 'play'
}
