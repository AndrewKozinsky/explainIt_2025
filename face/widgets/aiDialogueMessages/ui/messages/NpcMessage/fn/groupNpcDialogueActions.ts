import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'

/** Order the whole NPC message, retaining source indices for keys, audio and word maps. */
export function groupNpcDialogueActions(actions: AiDialoguePreviewActionItem[]) {
	const groups = actions.map((action, index) => ({
		key: index,
		speechIndex: action.type === 'speech' ? index : undefined,
		actionIndex: action.type !== 'speech' ? index : undefined,
	}))

	return [
		...groups.filter((group) => group.speechIndex !== undefined),
		...groups.filter((group) => group.actionIndex !== undefined),
	]
}
