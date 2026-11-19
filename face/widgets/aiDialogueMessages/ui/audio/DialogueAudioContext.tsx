'use client'

import { createContext, type ReactNode, useContext, useMemo } from 'react'
import type { DialogueAudioPlayer, DialogueAudioState } from '@/entities/aiDialogue/audio/DialogueAudioPlayer'

const AudioContext = createContext<{ player: DialogueAudioPlayer; state: DialogueAudioState } | null>(null)

export function DialogueAudioProvider({
	player,
	state,
	children,
}: {
	player: DialogueAudioPlayer
	state: DialogueAudioState
	children: ReactNode
}) {
	const value = useMemo(() => ({ player, state }), [player, state])

	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useDialogueAudio() {
	return useContext(AudioContext)
}
