export type NpcMetadataField = {
	name: 'appearance' | 'voice'
	value: string | undefined
	/** Index of the line holding the value. */
	valueIndex: number
	next: number
}

/**
 * Reads hidden NPC metadata at a label position. The prompt asks for "voice:" and the JSON on the next line,
 * but the model occasionally writes "voice: {...}" on one line; both forms must keep appearance and voice.
 */
export function readNpcMetadataField(block: string[], index: number): NpcMetadataField | null {
	const line = block[index]?.trim() ?? ''

	for (const name of ['appearance', 'voice'] as const) {
		const label = `${name}:`

		if (line === label) return { name, value: block[index + 1]?.trim(), valueIndex: index + 1, next: index + 2 }
		if (line.startsWith(label)) {
			return { name, value: line.slice(label.length).trim(), valueIndex: index, next: index + 1 }
		}
	}

	return null
}
