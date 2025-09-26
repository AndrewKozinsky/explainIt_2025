import { chapterStructureIntoText } from './chapterStructureIntoText'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'

// Test 1: Empty array
const test1: ChapterTextStructure.Chapter = []
console.log('Test 1 (empty):', JSON.stringify(chapterStructureIntoText(test1)))

// Test 2: Simple sentence
const test2: ChapterTextStructure.Chapter = [
	{
		t: 'sentence',
		translate: null,
		parts: [{ t: 'word', v: 'Hello' }, { t: 'space' }, { t: 'word', v: 'world' }, { t: 'punctuation', v: '!' }],
	},
]
console.log('Test 2 (simple):', JSON.stringify(chapterStructureIntoText(test2)))

// Test 3: Complex with carriage returns
const test3: ChapterTextStructure.Chapter = [
	{
		t: 'sentence',
		translate: null,
		parts: [{ t: 'word', v: 'First' }, { t: 'space' }, { t: 'word', v: 'line' }, { t: 'punctuation', v: '.' }],
	},
	{ t: 'carriageReturn' },
	{
		t: 'sentence',
		translate: null,
		parts: [{ t: 'word', v: 'Second' }, { t: 'space' }, { t: 'word', v: 'line' }, { t: 'punctuation', v: '.' }],
	},
]
console.log('Test 3 (multiline):', JSON.stringify(chapterStructureIntoText(test3)))

// Test 4: Top-level elements
const test4: ChapterTextStructure.Chapter = [{ t: 'space' }, { t: 'punctuation', v: '...' }, { t: 'carriageReturn' }]
console.log('Test 4 (top-level):', JSON.stringify(chapterStructureIntoText(test4)))

console.log('All tests completed successfully!')
