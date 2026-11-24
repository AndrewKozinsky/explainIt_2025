import type { TextSegment } from './textSegments'

/**
 * Часть общей рамки подсветки, которую рисует сегмент:
 * single — отдельный сегмент в замкнутой рамке;
 * start / middle / end — части ряда соседних подсвеченных сегментов;
 * bridge — пробел или пунктуация между словами ряда (только верх и низ рамки).
 */
export type FramePart = 'single' | 'start' | 'middle' | 'end' | 'bridge'

/**
 * Собирает подсвеченные сегменты в ряды, разделённые другими словами или переносами строки.
 * Ключ — start сегмента. Несоседние слова выражения (put … away) получают отдельные рамки.
 */
export function getFrameParts(segments: TextSegment[], highlightedStarts: ReadonlySet<number>): Map<number, FramePart> {
	const frameParts = new Map<number, FramePart>()
	const highlightedIndexes = segments.flatMap((segment, index) =>
		highlightedStarts.has(segment.start) ? [index] : [],
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
			previousIndex !== undefined &&
			segments
				.slice(previousIndex + 1, index)
				.every((segment) => !segment.isWord && !/[\r\n\u2028\u2029]/u.test(segment.text))

		if (!isNeighbour) closeRun()

		runIndexes.push(index)
	}

	closeRun()

	return frameParts
}

/** Части рамки для ряда из нескольких соседних слов, включая мостики между ними. */
function assignRunParts(segments: TextSegment[], runIndexes: number[], frameParts: Map<number, FramePart>) {
	const firstIndex = runIndexes[0]
	const lastIndex = runIndexes[runIndexes.length - 1]

	for (let index = firstIndex; index <= lastIndex; index++) {
		const segment = segments[index]

		if (index === firstIndex) frameParts.set(segment.start, 'start')
		else if (index === lastIndex) frameParts.set(segment.start, 'end')
		else if (!segment.isWord) frameParts.set(segment.start, 'bridge')
		else frameParts.set(segment.start, 'middle')
	}
}
