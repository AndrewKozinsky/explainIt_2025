import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'

export function getDialogueMeta(dialogue: AiDialogueListItemModel, locale: string) {
	const language =
		new Intl.DisplayNames([locale], { type: 'language' }).of(dialogue.sourceLanguageCode) ??
		dialogue.sourceLanguageCode

	return {
		languageName: language.charAt(0).toLocaleUpperCase(locale) + language.slice(1),
		level: dialogue.maxCefrLevel ?? 'Без ограничения',
	}
}
