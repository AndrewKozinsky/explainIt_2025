import type { AiDialogueActionItem } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'

type DialogueActionGroup = {
	key: number
	speechIndex?: number
	actionIndex?: number
}

/** Pair a speech with the immediately following action without reordering source items. */
export function groupDialogueActions(actions: AiDialogueActionItem[]): DialogueActionGroup[] {
	const groups: DialogueActionGroup[] = []

	for (const [index, action] of actions.entries()) {
		if (action.type === 'speech') {
			groups.push({ key: index, speechIndex: index })
			continue
		}

		const previous = groups[groups.length - 1]

		if (previous?.speechIndex !== undefined && previous.actionIndex === undefined) {
			previous.actionIndex = index
		} else {
			groups.push({ key: index, actionIndex: index })
		}
	}

	return groups
}
