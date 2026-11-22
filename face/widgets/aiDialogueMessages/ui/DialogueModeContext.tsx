import { createContext, useContext } from 'react'
import type { AiDialogueMode } from '@/entities/aiDialogue/repository/AiDialogueRepository'

export const DialogueModeContext = createContext<AiDialogueMode>('practice')

export function useDialogueMode() {
	return useContext(DialogueModeContext)
}
