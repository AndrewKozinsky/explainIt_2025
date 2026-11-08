import type { DialogueTextSegment } from './wordSelection'

/**
 * Часть общей рамки подсветки, которую рисует сегмент:
 * single — отдельное слово в замкнутой рамке;
 * start / middle / end — первое, среднее и последнее слово ряда соседних подсвеченных слов;
 * bridge — пробел или пунктуация между словами ряда (только верх и низ рамки).
 */
export type FramePart = 'single' | 'start' | 'middle' | 'end' | 'bridge'

/**
 * Делит подсвеченные слова на ряды соседних (между ними нет других слов) и назначает каждому сегменту ряда
 * его часть общей рамки. Ключ — start сегмента. Несоседние слова выражения (put … away) получают отдельные рамки.
 */
export function getFrameParts(segments: DialogueTextSegment[], highlightedStarts: Set<number>): Map<number, FramePart> {
	const frameParts = new Map<number, FramePart>()
	const highlightedIndexes = segments.flatMap((segment, index) =>
		segment.isWord && highlightedStarts.has(segment.start) ? [index] : [],
	)

	let runIndexes: number[] = []

	function closeRun() {
		if (runIndexes.length === 1) frameParts.set(segments[runIndexes[0]].start, 'single')
		if (runIndexes.length > 1) assignRunParts(segments, runIndexes, frameParts)

		runIndexes = []
	}

	for (const index of highlightedIndexes) {
		const previousIndex = runIndexes[runIndexes.length - 1]
		const isNeighbour =
			previousIndex !== undefined && segments.slice(previousIndex + 1, index).every((segment) => !segment.isWord)

		if (!isNeighbour) closeRun()

		runIndexes.push(index)
	}

	closeRun()

	return frameParts
}

/** Части рамки для ряда из нескольких соседних слов, включая мостики между ними. */
function assignRunParts(segments: DialogueTextSegment[], runIndexes: number[], frameParts: Map<number, FramePart>) {
	const firstIndex = runIndexes[0]
	const lastIndex = runIndexes[runIndexes.length - 1]

	for (let index = firstIndex; index <= lastIndex; index++) {
		const segment = segments[index]

		if (!segment.isWord) frameParts.set(segment.start, 'bridge')
		else if (index === firstIndex) frameParts.set(segment.start, 'start')
		else if (index === lastIndex) frameParts.set(segment.start, 'end')
		else frameParts.set(segment.start, 'middle')
	}
}
