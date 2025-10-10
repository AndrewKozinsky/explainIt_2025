import { describe, it, expect } from 'vitest'
import { chapterStructureIntoText } from './chapterStructureIntoText'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

function w(id: number, value: string): ChapterTextStructurePopulated.Word {
	return { id, type: 'word', value }
}

function sp(id: number) {
	return { id, type: 'space' as const }
}

function p(id: number, value: string) {
	return { id, type: 'punctuation' as const, value }
}

function cr(id: number) {
	return { id, type: 'carriageReturn' as const }
}

describe('populatedChapterStructureIntoText', () => {
	it('reconstructs text from a single sentence with words, spaces, punctuation', () => {
		const chapter: ChapterTextStructurePopulated.Chapter = [
			{
				id: 1,
				type: 'sentence',
				translation: null,
				parts: [w(2, 'Get'), sp(3), w(4, 'out'), p(5, '!')],
				phrases: [],
			},
		]

		const text = chapterStructureIntoText(chapter)
		expect(text).toBe('Get out!')
	})

	it('handles top-level spaces, punctuation and carriage returns between sentences', () => {
		const chapter: ChapterTextStructurePopulated.Chapter = [
			{
				id: 1,
				type: 'sentence',
				translation: 'Перевод 1',
				parts: [w(2, 'Hello'), p(3, ','), sp(4), w(5, 'world')],
				phrases: [],
			},
			p(6, '!'),
			sp(7),
			cr(8),
			{
				id: 9,
				type: 'sentence',
				translation: null,
				parts: [w(10, 'Another'), sp(11), w(12, 'line'), p(13, '.')],
				phrases: [],
			},
		]

		const text = chapterStructureIntoText(chapter)
		expect(text).toBe('Hello, world! \nAnother line.')
	})

	it('handles carriage returns inside a sentence parts', () => {
		const chapter: ChapterTextStructurePopulated.Chapter = [
			{
				id: 1,
				type: 'sentence',
				translation: null,
				parts: [w(2, 'Line1'), cr(3), w(4, 'Line2')],
				phrases: [],
			},
		]

		const text = chapterStructureIntoText(chapter)
		expect(text).toBe('Line1\nLine2')
	})
})
