import { INestApplication } from '@nestjs/common'
import { ChapterTextStructure } from '../../src/features/bookChapter/chapterStructure/chapterStructureTypes'
import { z } from 'zod'
import { queries } from '../../src/features/db/queries'
import { BookChapterRepository } from '../../src/repo/bookChapter.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'

export const bookChapterUtils = {
	checkBookChapterOutResp(
		bookChapter: any,
		checks?: {
			id?: number
			bookId?: number
			name?: string
			header?: string
			content?: string
			note?: string
			book?: { id?: number; name?: string; author?: string; note?: string; userId?: number }
		},
	) {
		const userDataSchema = z
			.object({
				id: z.number(),
				name: z.string().nullable(),
				header: z.string().nullable(),
				content: z.string().nullable(),
				note: z.string().nullable(),
				book: z.object({
					id: z.number(),
					name: z.string().nullable(),
					author: z.string().nullable(),
					note: z.string().nullable(),
					userId: z.number(),
				}),
			})
			.strict()

		const parsed = userDataSchema.safeParse(bookChapter)

		if (!parsed.success) {
			throw new Error(`Invalid user object: ${parsed.error.message}`)
		}

		if (checks?.id) {
			expect(bookChapter.id).toBe(checks.id)
		}
		if (checks?.bookId) {
			expect(bookChapter.bookId).toBe(checks.bookId)
		}
		if (checks?.name !== undefined) {
			expect(bookChapter.name).toBe(checks.name)
		}
		if (checks?.header !== undefined) {
			expect(bookChapter.header).toBe(checks.header)
		}
		if (checks?.content !== undefined) {
			expect(bookChapter.content).toBe(checks.content)
		}
		if (checks?.note !== undefined) {
			expect(bookChapter.note).toBe(checks.note)
		}

		if (checks?.book) {
			for (let bookKey in checks.book) {
				expect(bookChapter.book[bookKey]).toBe(checks.book[bookKey])
			}
		}
	},

	checkAnalyseSentenceAndPhraseResp(
		responseData: any,
		checks?: {
			sentenceTranslation?: string
			phrase?: {
				id?: number
				phrase?: string
				translation?: string
				analysis?: string
				examples?: Array<{
					id?: number
					sentence?: string
					translate?: string
				}>
			}
		},
	) {
		const analysisResponseSchema = z
			.object({
				sentenceTranslation: z.string(),
				phrase: z.object({
					id: z.number(),
					phrase: z.string(),
					translation: z.string(),
					analysis: z.string(),
					examples: z.array(
						z.object({
							id: z.number(),
							sentence: z.string(),
							translate: z.string(),
						}),
					),
				}),
			})
			.strict()

		const parsed = analysisResponseSchema.safeParse(responseData)

		if (!parsed.success) {
			throw new Error(`Invalid analysis response object: ${parsed.error.message}`)
		}

		if (checks?.sentenceTranslation !== undefined) {
			expect(responseData.sentenceTranslation).toBe(checks.sentenceTranslation)
		}

		if (checks?.phrase) {
			if (checks.phrase.id !== undefined) {
				expect(responseData.phrase.id).toBe(checks.phrase.id)
			}
			if (checks.phrase.phrase !== undefined) {
				expect(responseData.phrase.phrase).toBe(checks.phrase.phrase)
			}
			if (checks.phrase.translation !== undefined) {
				expect(responseData.phrase.translation).toBe(checks.phrase.translation)
			}
			if (checks.phrase.analysis !== undefined) {
				expect(responseData.phrase.analysis).toBe(checks.phrase.analysis)
			}
			if (checks.phrase.examples !== undefined) {
				expect(responseData.phrase.examples).toHaveLength(checks.phrase.examples.length)
				checks.phrase.examples.forEach((expectedExample, index) => {
					const actualExample = responseData.phrase.examples[index]
					if (expectedExample.id !== undefined) {
						expect(actualExample.id).toBe(expectedExample.id)
					}
					if (expectedExample.sentence !== undefined) {
						expect(actualExample.sentence).toBe(expectedExample.sentence)
					}
					if (expectedExample.translate !== undefined) {
						expect(actualExample.translate).toBe(expectedExample.translate)
					}
				})
			}
		}
	},

	async createBookChapter(input: {
		app: INestApplication
		sessionToken: any
		bookChapter: {
			bookId: number
			name?: null | string
			header?: null | string
			content?: null | string
			note?: null | string
		}
	}) {
		// Create a book Chapter mutation
		const createBookChapterMutation = queries.bookChapter.create(input.bookChapter)

		// Run this mutation
		const [createBookChapterResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createBookChapterMutation.query,
			queryVariables: createBookChapterMutation.variables,
			sessionToken: input.sessionToken,
		})

		return createBookChapterResp
	},

	async updateBookChapter(input: {
		app: INestApplication
		sessionToken: any
		bookChapter: {
			id: number
			header?: null | string
			name?: null | string
			content?: null | string
			note?: null | string
			convertContentIntoStructure?: boolean
		}
	}) {
		// Update a book chapter mutation
		const updateBookChapterMutation = queries.bookChapter.update(input.bookChapter)

		// Run this mutation
		const [updateBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: updateBookChapterMutation.query,
			queryVariables: updateBookChapterMutation.variables,
			sessionToken: input.sessionToken,
		})

		return updateBookResp
	},

	async deleteBookChapter(input: {
		app: INestApplication
		sessionToken: any
		bookChapter: {
			id: number
		}
	}) {
		// Delete a book chapter mutation
		const deleteBookChapterMutation = queries.bookChapter.delete(input.bookChapter)

		// Run this mutation
		const [updateBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: deleteBookChapterMutation.query,
			queryVariables: deleteBookChapterMutation.variables,
			sessionToken: input.sessionToken,
		})

		return updateBookResp
	},

	async getBookChapters(input: { bookId: number; bookChapterRepository: BookChapterRepository }) {
		return await input.bookChapterRepository.getBookChapterByBookId(input.bookId)
	},

	async getBookChapter(input: {
		app: INestApplication
		sessionToken: any
		bookChapter: {
			id: number
		}
	}) {
		// Get a book chapter query
		const getBookChapterQuery = queries.bookChapter.get(input.bookChapter)

		// Run this query
		const [getBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: getBookChapterQuery.query,
			queryVariables: getBookChapterQuery.variables,
			sessionToken: input.sessionToken,
		})

		return getBookResp
	},

	getExampleChapterText() {
		return `Alice was very tired: she had the book. “What is the use of a book,” thought Alice “without conversations?”

So she was confused.
White Rabbit ran by her.`
	},

	getExampleChapterTextStructure(): ChapterTextStructure.Chapter {
		return [
			{
				t: 'sentence',
				translate: null,
				parts: [
					{
						t: 'word',
						v: 'Alice',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'was',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'very',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'tired',
					},
					{
						t: 'punctuation',
						v: ':',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'she',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'had',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'the',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'book',
					},
					{
						t: 'punctuation',
						v: '.',
					},
				],
			},
			{
				t: 'space',
			},
			{
				t: 'sentence',
				translate: null,
				parts: [
					{
						t: 'punctuation',
						v: '“',
					},
					{
						t: 'word',
						v: 'What',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'is',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'the',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'use',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'of',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'a',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'book',
					},
					{
						t: 'punctuation',
						v: ',”',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'thought',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'Alice',
					},
					{
						t: 'space',
					},
					{
						t: 'punctuation',
						v: '“',
					},
					{
						t: 'word',
						v: 'without',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'conversations',
					},
					{
						t: 'punctuation',
						v: '?”',
					},
				],
			},
			{
				t: 'carriageReturn',
			},
			{
				t: 'carriageReturn',
			},
			{
				t: 'sentence',
				translate: null,
				parts: [
					{
						t: 'word',
						v: 'So',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'she',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'was',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'confused',
					},
					{
						t: 'punctuation',
						v: '.',
					},
				],
			},
			{
				t: 'carriageReturn',
			},
			{
				t: 'sentence',
				translate: null,
				parts: [
					{
						t: 'word',
						v: 'White',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'Rabbit',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'ran',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'by',
					},
					{
						t: 'space',
					},
					{
						t: 'word',
						v: 'her',
					},
					{
						t: 'punctuation',
						v: '.',
					},
				],
			},
		]
	},
}
