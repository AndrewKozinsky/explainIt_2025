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
		return `Alice was very tired: she had peeped into the book. “And what is the use of a book,” thought Alice “without conversations?”

So she was considering in her own mind. Suddenly a White Rabbit ran close by her.`
	},

	getExampleChapterTextStructure(): ChapterTextStructure.Chapter {
		return [
			[
				{
					sentence: 'Alice was very tired: she had peeped into the book.',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'word', value: 'Alice' },
						{ id: 2, type: 'word', value: 'was' },
						{ id: 3, type: 'word', value: 'very' },
						{ id: 4, type: 'word', value: 'tired' },
						{ id: 5, type: 'punctuation', value: ':' },
						{ id: 6, type: 'word', value: 'she' },
						{ id: 7, type: 'word', value: 'had' },
						{ id: 8, type: 'word', value: 'peeped' },
						{ id: 9, type: 'word', value: 'into' },
						{ id: 10, type: 'word', value: 'the' },
						{ id: 11, type: 'word', value: 'book' },
						{ id: 12, type: 'punctuation', value: '.' },
					],
				},
				{
					sentence: '“And what is the use of a book,” thought Alice “without conversations?”',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'punctuation', value: '“' },
						{
							id: 2,
							type: 'word',
							value: 'And',
						},
						{
							id: 3,
							type: 'word',
							value: 'what',
						},
						{
							id: 4,
							type: 'word',
							value: 'is',
						},
						{
							id: 5,
							type: 'word',
							value: 'the',
						},
						{
							id: 6,
							type: 'word',
							value: 'use',
						},
						{
							id: 7,
							type: 'word',
							value: 'of',
						},
						{
							id: 8,
							type: 'word',
							value: 'a',
						},
						{
							id: 9,
							type: 'word',
							value: 'book',
						},
						{ id: 10, type: 'punctuation', value: ',”' },
						{
							id: 11,
							type: 'word',
							value: 'thought',
						},
						{
							id: 12,
							type: 'word',
							value: 'Alice',
						},
						{ id: 13, type: 'punctuation', value: '“' },
						{
							id: 14,
							type: 'word',
							value: 'without',
						},
						{
							id: 15,
							type: 'word',
							value: 'conversations',
						},
						{ id: 16, type: 'punctuation', value: '?”' },
					],
				},
			],
			[
				{
					sentence: 'So she was considering in her own mind.',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'word', value: 'So' },
						{ id: 2, type: 'word', value: 'she' },
						{ id: 3, type: 'word', value: 'was' },
						{ id: 4, type: 'word', value: 'considering' },
						{ id: 5, type: 'word', value: 'in' },
						{ id: 6, type: 'word', value: 'her' },
						{ id: 7, type: 'word', value: 'own' },
						{ id: 8, type: 'word', value: 'mind' },
						{ id: 9, type: 'punctuation', value: '.' },
					],
				},
				{
					sentence: 'Suddenly a White Rabbit ran close by her.',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'word', value: 'Suddenly' },
						{ id: 2, type: 'word', value: 'a' },
						{ id: 3, type: 'word', value: 'White' },
						{ id: 4, type: 'word', value: 'Rabbit' },
						{ id: 5, type: 'word', value: 'ran' },
						{ id: 6, type: 'word', value: 'close' },
						{ id: 7, type: 'word', value: 'by' },
						{ id: 8, type: 'word', value: 'her' },
						{ id: 9, type: 'punctuation', value: '.' },
					],
				},
			],
		]
	},
}
