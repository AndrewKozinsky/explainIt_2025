import { useState } from 'react'
import type { CreateAiDialogueInput } from '@/entities/aiDialogue/AiDialogueService'
import { type AiDialogueTextLevel, textLevels } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import type { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { useLanguagesToLearn } from '@/shared/utils/useLanguagesToLearn'
import { useStartDialogueIllustrationStyle } from './useStartDialogueIllustrationStyle'

export type StartDialogueOptions = Pick<CreateAiDialogueInput, 'sourceLanguageCode' | 'maxCefrLevel'> & {
	illustrationStyleId: string
	userScenarioAmendment: string | null
}

/**
 * Язык, сложность и стиль нового диалога восстанавливаются из localStorage.
 * Пожелания к сцене относятся к конкретному сценарию, поэтому не сохраняются и начинаются с пустой строки.
 */
export function useStartDialogueOptions() {
	const illustrationStyles = useStartDialogueIllustrationStyle()
	// Переводы в диалоге идут на язык интерфейса, поэтому изучать его самого нет смысла
	const practiceLanguages = useLanguagesToLearn()

	const [practiceLanguage, setPracticeLanguage] = useState<LanguageCode>(function () {
		const savedLanguage = localStorageManager.lastLanguage.get()
		if (savedLanguage && practiceLanguages.includes(savedLanguage)) return savedLanguage
		return practiceLanguages.includes('en') ? 'en' : practiceLanguages[0]
	})

	const [textLevel, setTextLevel] = useState<AiDialogueTextLevel>(function () {
		const savedLevel = localStorageManager.lastAiDialogProficiency.get()
		return textLevels.find((level) => level === savedLevel) ?? 'Any'
	})

	const [userScenarioAmendment, setUserScenarioAmendment] = useState('')

	function changePracticeLanguage(language: LanguageCode) {
		setPracticeLanguage(language)
		localStorageManager.lastLanguage.set(language)
	}

	function changeTextLevel(level: AiDialogueTextLevel) {
		setTextLevel(level)
		localStorageManager.lastAiDialogProficiency.set(level)
	}

	const trimmedUserScenarioAmendment = userScenarioAmendment.trim()
	const isUserScenarioAmendmentTooLong =
		trimmedUserScenarioAmendment.length > aiDialogueScenarioConfig.userScenarioAmendmentMaxLength

	let options: StartDialogueOptions | null = null
	if (illustrationStyles.selectedStyleId && !isUserScenarioAmendmentTooLong) {
		options = {
			sourceLanguageCode: practiceLanguage,
			maxCefrLevel: textLevel === 'Any' ? null : textLevel,
			illustrationStyleId: illustrationStyles.selectedStyleId,
			userScenarioAmendment: trimmedUserScenarioAmendment || null,
		}
	}

	return {
		practiceLanguages,
		practiceLanguage,
		changePracticeLanguage,
		textLevel,
		changeTextLevel,
		userScenarioAmendment,
		changeUserScenarioAmendment: setUserScenarioAmendment,
		isUserScenarioAmendmentTooLong,
		options,
		illustrationStyles,
	}
}
