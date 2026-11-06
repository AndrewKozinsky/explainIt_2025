import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'

/** anyLevelName — подпись «без ограничения уровня» на языке интерфейса */
export function getDialogueMeta(dialogue: AiDialogueListItemModel, locale: string, anyLevelName: string) {
	const language =
		new Intl.DisplayNames([locale], { type: 'language' }).of(dialogue.sourceLanguageCode) ??
		dialogue.sourceLanguageCode

	return {
		languageName: language.charAt(0).toLocaleUpperCase(locale) + language.slice(1),
		level: dialogue.maxCefrLevel ?? anyLevelName,
	}
}
