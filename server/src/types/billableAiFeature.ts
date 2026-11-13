/** Функции, за обращения к ИИ в которых списывается баланс пользователя. Передаются в аналитику. */
export type BillableAiFeature =
	| 'aiDialogue'
	| 'aiDialogueMessageCheck'
	| 'aiDialogueAudio'
	| 'aiDialogueImage'
	| 'aiDialogueDictation'
	| 'translation'
	| 'sentenceChat'
	| 'videoSubtitles'
