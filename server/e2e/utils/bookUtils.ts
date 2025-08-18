import { INestApplication } from '@nestjs/common'
import { z } from 'zod'
import { queries } from '../../src/features/db/queries'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReqWithTokens } from '../makeGQReq'

export const bookUtils = {
	checkBookOutResp(book: any, checks?: { id?: number; author?: string; name?: string; note?: string }) {
		const userDataSchema = z
			.object({
				id: z.number(),
				author: z.string().nullable(),
				name: z.string().nullable(),
				note: z.string().nullable(),
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
	},

	async createBook(input: {
		app: INestApplication
		mainConfig: MainConfigService
		sessionToken: any
		author: null | string
		name: null | string
		note: null | string
	}) {
		// Create a book
		const createFirstBookMutation = queries.book.create({
			author: input.author,
			name: input.name,
			note: input.note,
		})

		const [createBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			mainConfig: input.mainConfig,
			query: createFirstBookMutation,
			sessionToken: input.sessionToken,
		})

		return createBookResp.data[RouteNames.BOOK.CREATE]
	},

	async getUserBooks(input: { app: INestApplication; mainConfig: MainConfigService; sessionToken: any }) {
		const userBooksQuery = queries.book.getUserBooks()

		const [getUserBooksResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			mainConfig: input.mainConfig,
			query: userBooksQuery,
			sessionToken: input.sessionToken,
		})

		return getUserBooksResp.data[RouteNames.BOOK.GET_USER_BOOKS]
	},
}
