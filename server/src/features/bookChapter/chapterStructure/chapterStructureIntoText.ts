import { ChapterTextStructure } from './chapterStructureTypes'

/**
 * Converts a structured chapter (paragraphs -> sentences -> parts) back into plain text.
 *
 * Rules:
 * - For each paragraph, concatenates sentence.sentence values with a single space.
 * - Paragraphs are separated by a blank line ("\n\n").
 * - Leading/trailing whitespace of individual sentence strings is trimmed.
 * - Empty sentences/paragraphs are ignored.
 *
 * @param chapter Structured chapter data
 * @returns Plain text with multiple paragraphs
 */
export function chapterStructureToText(chapter: ChapterTextStructure.Chapter): string {
	if (!chapter || chapter.length === 0) return ''

	const paragraphs = chapter
		.map((paragraph) =>
			(paragraph || [])
				.map((s) => (s?.sentence ?? '').trim())
				.filter((s) => s.length > 0)
				.join(' ')
				.trim(),
		)
		.filter((p) => p.length > 0)

	return paragraphs.join('\n\n')
}
