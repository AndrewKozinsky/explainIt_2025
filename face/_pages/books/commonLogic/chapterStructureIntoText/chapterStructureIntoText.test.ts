import { chapterStructureIntoText } from './chapterStructureIntoText'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'

describe('chapterStructureIntoText', () => {
	test('should handle empty array', () => {
		const input: ChapterTextStructure.Chapter = []
		const result = chapterStructureIntoText(input)
		expect(result).toBe('')
	})

	test('should handle single word in sentence', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'Hello' }
				]
			}
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('Hello')
	})

	test('should handle sentence with word, space, and punctuation', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'Hello' },
					{ t: 'space' },
					{ t: 'word', v: 'world' },
					{ t: 'punctuation', v: '!' }
				]
			}
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('Hello world!')
	})

	test('should handle multiple sentences', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'Hello' },
					{ t: 'punctuation', v: '.' }
				]
			},
			{ t: 'space' },
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'World' },
					{ t: 'punctuation', v: '!' }
				]
			}
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('Hello. World!')
	})

	test('should handle carriage returns in sentence parts', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'Line1' },
					{ t: 'carriageReturn' },
					{ t: 'word', v: 'Line2' }
				]
			}
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('Line1\nLine2')
	})

	test('should handle top-level elements (space, carriageReturn, punctuation)', () => {
		const input: ChapterTextStructure.Chapter = [
			{ t: 'space' },
			{ t: 'carriageReturn' },
			{ t: 'punctuation', v: '...' }
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe(' \n...')
	})

	test('should handle complex mixed structure', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'First' },
					{ t: 'space' },
					{ t: 'word', v: 'sentence' },
					{ t: 'punctuation', v: '.' }
				]
			},
			{ t: 'carriageReturn' },
			{ t: 'carriageReturn' },
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'word', v: 'Second' },
					{ t: 'space' },
					{ t: 'word', v: 'paragraph' },
					{ t: 'punctuation', v: '?' }
				]
			},
			{ t: 'space' },
			{ t: 'punctuation', v: '---' }
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('First sentence.\n\nSecond paragraph? ---')
	})

	test('should handle sentence with only punctuation and spaces', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{ t: 'punctuation', v: '(' },
					{ t: 'space' },
					{ t: 'punctuation', v: ')' }
				]
			}
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('( )')
	})

	test('should handle sentence with translate field (should not affect output)', () => {
		const input: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translate: 'Привет мир',
				parts: [
					{ t: 'word', v: 'Hello' },
					{ t: 'space' },
					{ t: 'word', v: 'world' }
				]
			}
		]
		const result = chapterStructureIntoText(input)
		expect(result).toBe('Hello world')
	})
})
