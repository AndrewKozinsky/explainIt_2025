import { z } from 'zod'
import type { AiDialogueActionItem, UserActionsEvent } from 'types/aiDialogueMessage'

const text = z.string().trim().min(1).max(8_000)
const review = z.strictObject({
	parts: z.array(
		z.strictObject({
			index: z.number().int(),
			critical: z
				.array(z.strictObject({ title: text, sentenceMarkdown: text, explanationMarkdown: text }))
				.max(12),
			suggestions: z.array(z.strictObject({ explanationMarkdown: text, example: text })).max(12),
			correctedText: text.nullable(),
			translation: text,
		}),
	),
})

export function parseAiDialogueUserMessageReview(
	output: string,
	originals: AiDialogueActionItem[],
): UserActionsEvent | null {
	if (output.length > 128_000) return null

	let data: unknown

	try {
		data = JSON.parse(output)
	} catch {
		return null
	}

	const result = review.safeParse(data)
	if (!result.success || result.data.parts.length !== originals.length) return null

	const { parts } = result.data

	for (const [index, part] of parts.entries()) {
		if (part.index !== index || part.critical.length + part.suggestions.length > 12) return null
		if ((part.correctedText !== null) !== part.critical.length > 0) return null
		if (part.correctedText === originals[index].content) return null
	}

	return {
		type: 'userActions',
		actions: originals.map((item, index) => ({
			type: item.type,
			content: parts[index].correctedText ?? item.content,
			translation: parts[index].translation,
		})),
		textReview: parts.map(({ critical, suggestions }, index) => ({
			originalText: originals[index].content,
			analysis: { critical, suggestions },
		})),
	}
}
