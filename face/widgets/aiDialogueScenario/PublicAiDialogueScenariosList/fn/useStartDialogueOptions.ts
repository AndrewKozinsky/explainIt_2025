import { useState } from 'react'
import type { CreateAiDialogueInput } from '@/entities/aiDialogue/AiDialogueService'
import type { AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import type { LanguageCode } from '@/shared/utils/languages'

export const practiceLanguages: LanguageCode[] = ['en', 'de', 'fr', 'it', 'es']
export type StartDialogueOptions = Pick<CreateAiDialogueInput, 'sourceLanguageCode' | 'maxCefrLevel'>

/** Настройки нового диалога; при повторном открытии окна используются исходные значения. */
export function useStartDialogueOptions() {
	const [practiceLanguage, setPracticeLanguage] = useState<LanguageCode>('en')
	const [textLevel, setTextLevel] = useState<AiDialogueTextLevel>('Any')

	const options: StartDialogueOptions = {
		sourceLanguageCode: practiceLanguage,
		maxCefrLevel: textLevel === 'Any' ? null : textLevel,
	}

	return { practiceLanguage, setPracticeLanguage, textLevel, setTextLevel, options }
}
