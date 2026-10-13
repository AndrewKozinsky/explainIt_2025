'use client'

import { createContext, type ReactNode, useContext } from 'react'
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
	return <AudioContext.Provider value={{ player, state }}>{children}</AudioContext.Provider>
}

export function useDialogueAudio() {
	return useContext(AudioContext)
}
