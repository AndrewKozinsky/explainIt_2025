import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { getLocalizedLanguageName } from '@/shared/utils/languages'

/** anyLevelName — подпись «без ограничения уровня» на языке интерфейса */
export function getDialogueMeta(dialogue: AiDialogueListItemModel, locale: string, anyLevelName: string) {
	return {
		languageName: getLocalizedLanguageName(dialogue.sourceLanguageCode, locale),
		level: dialogue.cefrLevel ?? anyLevelName,
	}
}
