import { z } from 'zod'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueWordMapBlock, AiDialogueWordSelection } from 'types/aiDialogueWordMap'
import { Language } from 'utils/languages'
import { tokenizeAiDialogueBlocks, phraseFromWordIds } from './buildAiDialogueWordMap'

const referenceSchema = z.object({ text: z.string().min(1), occurrence: z.number().int().nonnegative() })
const selectionSchema = z.object({ clicked: referenceSchema, words: z.array(referenceSchema).min(2) })
const blockSchema = z.object({ content: z.string(), selections: z.array(z.unknown()) })

export function splitWordMapFooter(raw: string): { text: string; footer: string } {
	const marker = /(?:^|\n)[ \t]*wordMaps:[ \t]*(?:\r?\n|$)/.exec(raw)

	return marker
		? { text: raw.slice(0, marker.index), footer: raw.slice(marker.index + marker[0].length) }
		: { text: raw, footer: '' }
}

/** Bad metadata must not discard a valid reply or trigger another paid generation. */
export function attachInlineWordMaps(events: AiDialogueEvent[], footer: string, language: Language): AiDialogueEvent[] {
	const entries = new Map<string, unknown[]>()

	for (const line of footer.split('\n')) {
		try {
			const entry = blockSchema.parse(JSON.parse(line))

			if (!entries.has(entry.content)) entries.set(entry.content, entry.selections)
		} catch {
			// Other JSON lines remain usable; an absent map simply uses clicked words.
		}
	}
	return events.map((event) => {
		if (event.type === 'userActions' || event.type === 'userAvoidsNPC') return event
		const blocks = tokenizeAiDialogueBlocks(event, language)

		for (const block of Object.values(blocks)) {
			const seen = new Set<number>()

			for (const candidate of entries.get(block.content) ?? []) {
				const selection = resolveSelection(candidate, block)
				if (!selection || seen.has(selection.wordId)) continue
				seen.add(selection.wordId)
				block.selections.push(selection)
			}
		}

		return { ...event, wordMap: { status: 'ready', blocks } }
	})
}

function resolveSelection(candidate: unknown, block: AiDialogueWordMapBlock): AiDialogueWordSelection | null {
	const result = selectionSchema.safeParse(candidate)
	if (!result.success) return null
	function resolve(reference: z.infer<typeof referenceSchema>): number | undefined {
		return block.words.filter((word) => word.text === reference.text)[reference.occurrence]?.id
	}
	const wordId = resolve(result.data.clicked)
	const ids = result.data.words.map(resolve)
	if (wordId === undefined || ids.some((id) => id === undefined)) return null
	const wordIds = ids as number[]
	if (!wordIds.includes(wordId) || wordIds.some((id, index) => index > 0 && id <= wordIds[index - 1])) return null
	return { wordId, wordIds, phrase: phraseFromWordIds(block, wordIds) }
}
