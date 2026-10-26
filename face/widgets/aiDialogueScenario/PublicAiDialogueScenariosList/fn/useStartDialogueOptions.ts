import { useState } from 'react'
import type { CreateAiDialogueInput } from '@/entities/aiDialogue/AiDialogueService'
import { type AiDialogueTextLevel, textLevels } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import type { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { useStartDialogueIllustrationStyle } from './useStartDialogueIllustrationStyle'

export const practiceLanguages: LanguageCode[] = ['en', 'de', 'fr', 'it', 'es']
export type StartDialogueOptions = Pick<CreateAiDialogueInput, 'sourceLanguageCode' | 'maxCefrLevel'> & {
	illustrationStyleId: string
}

/** Язык, сложность и стиль нового диалога восстанавливаются из localStorage. */
export function useStartDialogueOptions() {
	const illustrationStyles = useStartDialogueIllustrationStyle()

	const [practiceLanguage, setPracticeLanguage] = useState<LanguageCode>(function () {
		const savedLanguage = localStorageManager.lastLanguage.get()
		return savedLanguage && practiceLanguages.includes(savedLanguage) ? savedLanguage : 'en'
	})
	const [textLevel, setTextLevel] = useState<AiDialogueTextLevel>(function () {
		const savedLevel = localStorageManager.lastAiDialogProficiency.get()
		return textLevels.find((level) => level === savedLevel) ?? 'Any'
	})

	function changePracticeLanguage(language: LanguageCode) {
		setPracticeLanguage(language)
		localStorageManager.lastLanguage.set(language)
	}

	function changeTextLevel(level: AiDialogueTextLevel) {
		setTextLevel(level)
		localStorageManager.lastAiDialogProficiency.set(level)
	}

	let options: StartDialogueOptions | null = null
	if (illustrationStyles.selectedStyleId) {
		options = {
			sourceLanguageCode: practiceLanguage,
			maxCefrLevel: textLevel === 'Any' ? null : textLevel,
			illustrationStyleId: illustrationStyles.selectedStyleId,
		}
	}

	return { practiceLanguage, changePracticeLanguage, textLevel, changeTextLevel, options, illustrationStyles }
}
