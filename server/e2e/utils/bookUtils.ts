import { INestApplication } from '@nestjs/common'
import { z } from 'zod'
import { queries } from '../../src/features/db/queries'
import { makeGraphQLReqWithTokens } from '../makeGQReq'

export const bookUtils = {
	checkBookOutResp(
		book: any,
		checks?: { id?: number; author?: string; name?: string; note?: string; userId?: number },
	) {
		const userDataSchema = z
			.object({
				id: z.number(),
				author: z.string().nullable(),
				name: z.string().nullable(),
				note: z.string().nullable(),
				userId: z.number().nullable(),
			})
			.strict()

		const parsed = userDataSchema.safeParse(book)

		if (!parsed.success) {
			throw new Error(`Invalid user object: ${parsed.error.message}`)
		}

		if (checks?.id) {
			expect(book.id).toBe(checks.id)
		}
		if (checks?.author !== undefined) {
			expect(book.author).toBe(checks.author)
		}
		if (checks?.name !== undefined) {
			expect(book.name).toBe(checks.name)
		}
		if (checks?.note !== undefined) {
			expect(book.note).toBe(checks.note)
		}
		if (checks?.userId !== undefined) {
			expect(book.userId).toBe(checks.userId)
		}
	},

	async createBook(input: {
		app: INestApplication
		sessionToken: any
		book: {
			author?: null | string
			name?: null | string
			note?: null | string
		}
	}) {
		// Create a book mutation
		const createBookMutation = queries.book.create(input.book)

		// Run this mutation
		const [createBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createBookMutation.query,
			queryVariables: createBookMutation.variables,
			sessionToken: input.sessionToken,
		})

		return createBookResp
	},

	async updateBook(input: {
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
		const createBookMutation = queries.book.update(input.book)

		// Run this mutation
		const [updateBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createBookMutation.query,
			queryVariables: createBookMutation.variables,
			sessionToken: input.sessionToken,
		})

		return updateBookResp
	},

	async getUserBooks(input: { app: INestApplication; sessionToken: any }) {
		const userBooksQuery = queries.book.getUserBooks()

		const [getUserBooksResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: userBooksQuery,
			sessionToken: input.sessionToken,
		})

		return getUserBooksResp
	},
}
