import type { DialogueAudioTarget } from './dialogueAudioTypes'

/** A later ready file must not overtake an earlier speech whose job has not arrived yet. */
export function getCompletedAudioTargets(raw: string): DialogueAudioTarget[] {
	const lines = raw
		.split('\n')
		.slice(0, -1)
		.map(function (line) {
			return line.replace(/\r$/, '')
		})

	const blocks: string[][] = []
	let block: string[] = []

	for (const line of lines) {
		if (line.trim() === 'wordMaps:') break
		if (!line.trim()) {
			if (block.length) blocks.push(block)
			block = []
			continue
		}
		block.push(line)
	}

	if (block.length) blocks.push(block)

	return blocks.flatMap(function (current, eventIndex) {
		if (current[0].trim() === 'sceneUpdate' && current.length >= 2)
			return [{ eventIndex, actionIndex: -1, npcId: null }]
		if (!current[0].trim().startsWith('npcActions|')) return []
		const npcId = current[0].split('|')[1]?.trim()
		if (!npcId) return []
		const targets: DialogueAudioTarget[] = []
		let actionIndex = 0
		let i = 1
		while (i < current.length) {
			const label = current[i].trim()
			if (label === 'appearance:' || label === 'voice:') {
				i += 2
				continue
			}
			if (label !== 'action:' && label !== 'speech:') break
			if (label === 'speech:' && current[i + 1]) targets.push({ eventIndex, actionIndex, npcId })
			actionIndex += 1
			i += 3
		}
		return targets
	})
}
