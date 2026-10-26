export type AiDialogueIllustrationStyleModel = {
	id: string
	titleKey: string
	previewUrl: string
}

export type AiDialogueIllustrationStylesModel = {
	defaultStyleId: string
	styles: AiDialogueIllustrationStyleModel[]
}
