import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'

export type DialogueCardProps = {
	dialogue: AiDialogueListItemModel
	locale: string
	onDelete: (id: number) => void
}
