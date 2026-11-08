import { useMemo } from 'react'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { buildWholeTextWordMap } from '@/widgets/aiDialogueMessages/ui/SegmentedText/fn/wordSelection'
import SegmentedText from '@/widgets/aiDialogueMessages/ui/SegmentedText/SegmentedText'

type NpcRoleTextProps = {
	role: string
	onWordSelect: AiDialogueWordSelectHandler
}

/** Должность персонажа: вся должность — одно выражение, клик по любому её слову отправляет в Словарь её целиком. */
function NpcRoleText({ role, onWordSelect }: NpcRoleTextProps) {
	const roleWordMap = useMemo(() => buildWholeTextWordMap(role), [role])

	function handleWordClick() {
		onWordSelect({ word: roleWordMap.selections[0]?.phrase ?? role, sentence: role })
	}

	return <SegmentedText text={role} wordMap={roleWordMap} onWordClick={handleWordClick} />
}

export default NpcRoleText
