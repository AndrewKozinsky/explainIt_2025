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
				id: 1,
				type: 'sentence',
				translatedSentence: null,
				sentenceParts: [
					{
						id: 1,
						type: 'word',
						value: 'Alice',
					},
					{
						id: 2,
						type: 'space',
					},
					{
						id: 3,
						type: 'word',
						value: 'was',
					},
					{
						id: 4,
						type: 'space',
					},
					{
						id: 5,
						type: 'word',
						value: 'very',
					},
					{
						id: 6,
						type: 'space',
					},
					{
						id: 7,
						type: 'word',
						value: 'tired',
					},
					{
						id: 8,
						type: 'punctuation',
						value: ':',
					},
					{
						id: 9,
						type: 'space',
					},
					{
						id: 10,
						type: 'word',
						value: 'she',
					},
					{
						id: 11,
						type: 'space',
					},
					{
						id: 12,
						type: 'word',
						value: 'had',
					},
					{
						id: 13,
						type: 'space',
					},
					{
						id: 14,
						type: 'word',
						value: 'the',
					},
					{
						id: 15,
						type: 'space',
					},
					{
						id: 16,
						type: 'word',
						value: 'book',
					},
					{
						id: 17,
						type: 'punctuation',
						value: '.',
					},
				],
			},
			{
				id: 2,
				type: 'space',
			},
			{
				id: 3,
				type: 'sentence',
				translatedSentence: null,
				sentenceParts: [
					{
						id: 1,
						type: 'punctuation',
						value: '“',
					},
					{
						id: 2,
						type: 'word',
						value: 'What',
					},
					{
						id: 3,
						type: 'space',
					},
					{
						id: 4,
						type: 'word',
						value: 'is',
					},
					{
						id: 5,
						type: 'space',
					},
					{
						id: 6,
						type: 'word',
						value: 'the',
					},
					{
						id: 7,
						type: 'space',
					},
					{
						id: 8,
						type: 'word',
						value: 'use',
					},
					{
						id: 9,
						type: 'space',
					},
					{
						id: 10,
						type: 'word',
						value: 'of',
					},
					{
						id: 11,
						type: 'space',
					},
					{
						id: 12,
						type: 'word',
						value: 'a',
					},
					{
						id: 13,
						type: 'space',
					},
					{
						id: 14,
						type: 'word',
						value: 'book',
					},
					{
						id: 15,
						type: 'punctuation',
						value: ',”',
					},
					{
						id: 16,
						type: 'space',
					},
					{
						id: 17,
						type: 'word',
						value: 'thought',
					},
					{
						id: 18,
						type: 'space',
					},
					{
						id: 19,
						type: 'word',
						value: 'Alice',
					},
					{
						id: 20,
						type: 'space',
					},
					{
						id: 21,
						type: 'punctuation',
						value: '“',
					},
					{
						id: 22,
						type: 'word',
						value: 'without',
					},
					{
						id: 23,
						type: 'space',
					},
					{
						id: 24,
						type: 'word',
						value: 'conversations',
					},
					{
						id: 25,
						type: 'punctuation',
						value: '?”',
					},
				],
			},
			{
				id: 4,
				type: 'carriageReturn',
			},
			{
				id: 5,
				type: 'carriageReturn',
			},
			{
				id: 6,
				type: 'sentence',
				translatedSentence: null,
				sentenceParts: [
					{
						id: 1,
						type: 'word',
						value: 'So',
					},
					{
						id: 2,
						type: 'space',
					},
					{
						id: 3,
						type: 'word',
						value: 'she',
					},
					{
						id: 4,
						type: 'space',
					},
					{
						id: 5,
						type: 'word',
						value: 'was',
					},
					{
						id: 6,
						type: 'space',
					},
					{
						id: 7,
						type: 'word',
						value: 'confused',
					},
					{
						id: 8,
						type: 'punctuation',
						value: '.',
					},
				],
			},
			{
				id: 7,
				type: 'carriageReturn',
			},
			{
				id: 8,
				type: 'sentence',
				translatedSentence: null,
				sentenceParts: [
					{
						id: 1,
						type: 'word',
						value: 'White',
					},
					{
						id: 2,
						type: 'space',
					},
					{
						id: 3,
						type: 'word',
						value: 'Rabbit',
					},
					{
						id: 4,
						type: 'space',
					},
					{
						id: 5,
						type: 'word',
						value: 'ran',
					},
					{
						id: 6,
						type: 'space',
					},
					{
						id: 7,
						type: 'word',
						value: 'by',
					},
					{
						id: 8,
						type: 'space',
					},
					{
						id: 9,
						type: 'word',
						value: 'her',
					},
					{
						id: 10,
						type: 'punctuation',
						value: '.',
					},
				],
			},
		]
	},
}
