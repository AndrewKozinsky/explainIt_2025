// import { describe, it, expect } from 'vitest'
// import { ChapterTextStructure, ChapterTextStructurePopulated } from '../../../commonLogic/chapterStructureTypes'
// import {} from /* usePopulateReadingStore, */ './getContentStructure'
// We import the function via a re-export pattern below because fullChapterStructureUsefulData is file-local.
// To keep minimal changes to source file, we re-import it by relative path with ts-ignore.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { __test_only__fullChapterStructureUsefulData as fullChapterStructureUsefulData } from './getContentStructure'

// In order to expose the function for tests, ensure getContentStructure.ts exports it under __test_only__fullChapterStructureUsefulData

/*describe('fullChapterStructureUsefulData', () => {
	it('maps sentences, parts, translations and phrases to populated structure', () => {
		const chapter: ChapterTextStructure.Chapter = [
			{
				t: 'sentence',
				translation: 'Перевод 1',
				parts: [{ t: 'word', v: 'Get' }, { t: 'space' }, { t: 'word', v: 'out' }, { t: 'punctuation', v: '!' }],
			},
			{ t: 'space' },
			{ t: 'carriageReturn' },
			{
				t: 'sentence',
				translation: null,
				parts: [
					{ t: 'word', v: 'Another' },
					{ t: 'space' },
					{ t: 'word', v: 'sentence' },
					{ t: 'punctuation', v: '.' },
				],
			},
		]

		const phrases: ChapterTextStructure.Phrase[] = [
			{
				id: 101,
				sentenceId: 1, // should map to the first sentence
				sentence: 'Get out!',
				phrase: 'get out',
				phraseWordsIdx: [1, 3], // positions of words in sentence (1-based or 0-based is up to consumer)
				translation: 'Убирайся',
				analysis: 'Фразовый глагол',
				examples: [{ id: 1, sentence: 'Get out of here!', translation: 'Убирайся отсюда!' }],
			},
		]

		const populated = fullChapterStructureUsefulData(chapter, phrases)

		// Validate top-level mapping and ids
		expect(populated.length).toBe(4)

		const s1 = populated[0] as ChapterTextStructurePopulated.Sentence
		expect(s1.type).toBe('sentence')
		expect(s1.id).toBe(1)
		expect(s1.translation).toBe('Перевод 1')
		expect(s1.parts.map((p) => p.type)).toEqual(['word', 'space', 'word', 'punctuation'])
		expect(s1.parts.map((p: any) => p.id)).toEqual([1, 2, 3, 4])

		// Phrases mapping for sentence 1
		expect(s1.phrases).toHaveLength(1)
		const pm = s1.phrases[0]
		expect(pm.phraseIdInDb).toBe(101)
		expect(pm.phrase).toBe('get out')
		expect(pm.wordIds).toEqual([1, 3])
		expect(pm.analysis.translation).toBe('Убирайся')
		expect(pm.analysis.analysis).toBe('Фразовый глагол')
		expect(pm.analysis.examples).toEqual([{ foreignLang: 'Get out of here!', nativeLang: 'Убирайся отсюда!' }])

		// Non-sentence items
		expect((populated[1] as any).type).toBe('space')
		expect((populated[2] as any).type).toBe('carriageReturn')

		// Second sentence without phrases
		const s2 = populated[3] as ChapterTextStructurePopulated.Sentence
		expect(s2.type).toBe('sentence')
		expect(s2.id).toBe(4) // since ids increment across all items
		expect(s2.translation).toBeNull()
		expect(s2.phrases).toHaveLength(0)
	})
})*/
