import { INestApplication } from '@nestjs/common'
import { loggerFor } from 'openai/internal/utils/log'
import { z } from 'zod'
import { queries } from '../../src/features/db/queries'
import { makeGraphQLReqWithTokens } from '../makeGQReq'

export const bookChapterUtils = {
	checkBookChapterOutResp(
		bookChapter: any,
		checks?: { id?: number; bookId?: number; name?: string; header?: string; content?: string; note?: string },
	) {
		const userDataSchema = z
			.object({
				id: z.number(),
				bookId: z.number(),
				name: z.string().nullable(),
				header: z.string().nullable(),
				content: z.string().nullable(),
				note: z.string().nullable(),
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
		const createFirstBookChapterMutation = queries.bookChapter.create(input.bookChapter)

		// Run this mutation
		const [createBookChapterResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createFirstBookChapterMutation.query,
			queryVariables: createFirstBookChapterMutation.variables,
			sessionToken: input.sessionToken,
		})

		return createBookChapterResp
	},

	/*async updateBookChapter(input: {
		app: INestApplication
		sessionToken: any
		book: {
			id: number
			author?: null | string
			name?: null | string
			note?: null | string
		}
	}) {
		// Update a book mutation
		const createFirstBookMutation = queries.book.update(input.book)

		// Run this mutation
		const [updateBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createFirstBookMutation.query,
			queryVariables: createFirstBookMutation.variables,
			sessionToken: input.sessionToken,
		})

		return updateBookResp
	},*/

	/*async getUserBooks(input: { app: INestApplication; sessionToken: any }) {
		const userBooksQuery = queries.book.getUserBooks()

		const [getUserBooksResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: userBooksQuery,
			sessionToken: input.sessionToken,
		})

		return getUserBooksResp
	},*/
}
