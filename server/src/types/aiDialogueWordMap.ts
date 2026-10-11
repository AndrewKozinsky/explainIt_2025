/** Offsets use JavaScript UTF-16 indices in the original, unchanged content. */
export type AiDialogueWord = {
	id: number
	text: string
	start: number
	end: number
}

export type AiDialogueWordSelection = {
	wordId: number
	wordIds: number[]
	phrase: string
}

export type AiDialogueWordMapBlock = {
	content: string
	words: AiDialogueWord[]
	selections: AiDialogueWordSelection[]
}

/** Keys are content or action:<zero-based index>; expressions may overlap or be discontinuous. */
export type AiDialogueWordMap = {
	status: 'pending' | 'ready' | 'failed'
	blocks: Record<string, AiDialogueWordMapBlock>
}
