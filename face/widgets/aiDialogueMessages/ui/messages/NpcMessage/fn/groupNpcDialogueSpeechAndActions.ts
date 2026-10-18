import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'

/** Order the whole NPC message, retaining source indices for keys, audio and word maps. */
export function groupNpcDialogueSpeechAndActions(speechAndActions: AiDialoguePreviewActionItem[]) {
	const groups = speechAndActions.map((item, index) => ({
		key: index,
		speechIndex: item.type === 'speech' ? index : undefined,
		actionIndex: item.type !== 'speech' ? index : undefined,
	}))

	return [
		...groups.filter((group) => group.speechIndex !== undefined),
		...groups.filter((group) => group.actionIndex !== undefined),
	]
}
