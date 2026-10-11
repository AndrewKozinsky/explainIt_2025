import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueWordMapBlock } from 'types/aiDialogueWordMap'
import { Language } from 'utils/languages'

export function getAiDialogueTextBlocks(event: AiDialogueEvent): Record<string, string> {
	if (event.type === 'userActions' || event.type === 'userAvoidsNPC') return {}
	if (event.type !== 'npcActions') return { content: event.content }

	return Object.fromEntries(event.actions.map((action, index) => [`action:${index}`, action.content]))
}

export function tokenizeAiDialogueBlocks(
	event: AiDialogueEvent,
	language: Language,
): Record<string, AiDialogueWordMapBlock> {
	const segmenter = new Intl.Segmenter(language, { granularity: 'word' })

	return Object.fromEntries(
		Object.entries(getAiDialogueTextBlocks(event)).map(([key, content]) => {
			const words = Array.from(segmenter.segment(content))
				.filter((segment) => segment.isWordLike)
				.map((segment, id) => ({
					id,
					text: segment.segment,
					start: segment.index,
					end: segment.index + segment.segment.length,
				}))

			return [key, { content, words, selections: [] }]
		}),
	)
}

/** Preserve spelling and punctuation within adjacent runs; join separated runs with a space. */
export function phraseFromWordIds(block: AiDialogueWordMapBlock, ids: number[]): string {
	const runs: string[] = []
	let startId = ids[0]

	for (let index = 1; index <= ids.length; index += 1) {
		if (index < ids.length && ids[index] === ids[index - 1] + 1) continue

		runs.push(block.content.slice(block.words[startId].start, block.words[ids[index - 1]].end))
		startId = ids[index]
	}

	return runs.join(' ')
}
