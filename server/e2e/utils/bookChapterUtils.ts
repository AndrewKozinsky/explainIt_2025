import { INestApplication } from '@nestjs/common'
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
		}
	}) {
		// Update a book chapter mutation
		const createBookChapterMutation = queries.bookChapter.update(input.bookChapter)

		// Run this mutation
		const [updateBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createBookChapterMutation.query,
			queryVariables: createBookChapterMutation.variables,
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
}
