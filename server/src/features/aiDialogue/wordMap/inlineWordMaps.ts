import { z } from 'zod'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueWord, AiDialogueWordMapBlock } from 'types/aiDialogueWordMap'
import { Language } from 'utils/languages'
import { tokenizeAiDialogueBlocks, phraseFromWordIds } from './buildAiDialogueWordMap'

/** A word is a plain string; a repeated word is [text, zero-based occurrence]. */
const referenceSchema = z.union([
	z.string().min(1),
	z.tuple([z.string().min(1), z.number().int().nonnegative()]),
])
const groupSchema = z.array(referenceSchema).min(2)
const blockSchema = z.object({ content: z.string(), groups: z.array(z.unknown()) })

export function splitWordMapFooter(raw: string): { text: string; footer: string } {
	const marker = /(?:^|\n)[ \t]*wordMaps:[ \t]*(?:\r?\n|$)/.exec(raw)

	return marker
		? { text: raw.slice(0, marker.index), footer: raw.slice(marker.index + marker[0].length) }
		: { text: raw, footer: '' }
}

/**
 * The model describes a whole content line or, more often, each of its sentences separately,
 * so an entry is matched to every place where its text occurs in a block.
 * Bad metadata must not discard a valid reply or trigger another paid generation.
 */
export function attachInlineWordMaps(events: AiDialogueEvent[], footer: string, language: Language): AiDialogueEvent[] {
	const groupsByFragment = new Map<string, unknown[]>()

	for (const line of footer.split('\n')) {
		try {
			const entry = blockSchema.parse(JSON.parse(line))
			const fragment = entry.content.trim()

			if (fragment && !groupsByFragment.has(fragment)) groupsByFragment.set(fragment, entry.groups)
		} catch {
			// Other JSON lines remain usable; text without a map leaves its words ungrouped.
		}
	}
	return events.map((event) => {
		if (event.type === 'userActions' || event.type === 'userAvoidsNPC') return event
		const blocks = tokenizeAiDialogueBlocks(event, language)

		for (const block of Object.values(blocks)) {
			const groupedWordIds = new Set<number>()

			for (const [fragment, groups] of groupsByFragment) {
				for (const fragmentWords of findFragmentWords(block, fragment)) {
					for (const candidate of groups) {
						const wordIds = resolveGroup(candidate, fragmentWords)
						// A word belongs to one group at most: the first valid group wins.
						if (!wordIds || wordIds.some((wordId) => groupedWordIds.has(wordId))) continue

						const phrase = phraseFromWordIds(block, wordIds)

						for (const wordId of wordIds) {
							groupedWordIds.add(wordId)
							block.selections.push({ wordId, wordIds, phrase })
						}
					}
				}
			}

			block.selections.sort((first, second) => first.wordId - second.wordId)
		}

		return { ...event, wordMap: { status: 'ready', blocks } }
	})
}

/** Words of every occurrence of the fragment in the block; an occurrence that cuts a word in two is skipped. */
function findFragmentWords(block: AiDialogueWordMapBlock, fragment: string): AiDialogueWord[][] {
	const occurrences: AiDialogueWord[][] = []
	let fragmentStart = block.content.indexOf(fragment)

	while (fragmentStart !== -1) {
		const fragmentEnd = fragmentStart + fragment.length
		const cutsWord = block.words.some(
			(word) =>
				(word.start < fragmentStart && word.end > fragmentStart) ||
				(word.start < fragmentEnd && word.end > fragmentEnd),
		)

		if (!cutsWord) {
			occurrences.push(block.words.filter((word) => word.start >= fragmentStart && word.end <= fragmentEnd))
		}

		fragmentStart = block.content.indexOf(fragment, fragmentEnd)
	}

	return occurrences
}

/** Returns the ids of the group's words in source order, or null when a reference is wrong. */
function resolveGroup(candidate: unknown, fragmentWords: AiDialogueWord[]): number[] | null {
	const group = groupSchema.safeParse(candidate)
	if (!group.success) return null

	const wordIds: number[] = []

	for (const reference of group.data) {
		const [text, occurrence] = typeof reference === 'string' ? [reference, 0] : reference
		const wordId = fragmentWords.filter((word) => word.text === text)[occurrence]?.id
		const previousWordId = wordIds[wordIds.length - 1]

		if (wordId === undefined || (previousWordId !== undefined && wordId <= previousWordId)) return null
		wordIds.push(wordId)
	}

	return wordIds
}
