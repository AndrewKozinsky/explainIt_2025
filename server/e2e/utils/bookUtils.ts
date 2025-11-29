import { INestApplication } from '@nestjs/common'
import { bookChapterUtils } from './bookChapterUtils'
import { z } from 'zod'
import { queries } from '../../src/features/db/queries'
import { makeGraphQLReqWithTokens } from '../makeGQReq'

export const bookUtils = {
	checkBookOutResp(
		book: any,
		checks?: {
			id?: number
			author?: string
			name?: string
			note?: string
			userId?: number
			chapters?: { id?: number; bookId?: number; name?: string; header?: string; note?: string }[]
		},
	) {
		const userDataSchema = z
			.object({
				id: z.number(),
				author: z.string().nullable(),
				name: z.string().nullable(),
				note: z.string().nullable(),
				userId: z.number().nullable(),
				chapters: z.array(
					z.object({
						id: z.number(),
						bookId: z.number(),
						name: z.string().nullable(),
						header: z.string().nullable(),
						note: z.string().nullable(),
					}),
				),
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

		if (checks?.chapters) {
			checks.chapters.forEach((checkChapter, i) => {
				const bookChapter = book.chapters[i]

				for (let key in checkChapter) {
					expect(checkChapter[key]).toBe(bookChapter[key])
				}
			})
		}
	},

	async createBookPrivate(input: {
		app: INestApplication
		sessionToken: any
		book: {
			author?: null | string
			name?: null | string
			note?: null | string
		}
	}) {
		// Create a book mutation
		const createBookPrivateMutation = queries.book.create(input.book)

		// Run this mutation
		const [createBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: createBookPrivateMutation.query,
			queryVariables: createBookPrivateMutation.variables,
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
		const updateBookMutation = queries.book.update(input.book)

		// Run this mutation
		const [updateBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: updateBookMutation.query,
			queryVariables: updateBookMutation.variables,
			sessionToken: input.sessionToken,
		})

		return updateBookResp
	},

	async deleteBook(input: {
		app: INestApplication
		sessionToken: any
		book: {
			id: number
		}
	}) {
		// Delete a book mutation
		const deleteBookMutation = queries.book.delete(input.book)

		// Run this mutation
		const [deleteBookResp] = await makeGraphQLReqWithTokens({
			app: input.app,
			query: deleteBookMutation.query,
			queryVariables: deleteBookMutation.variables,
			sessionToken: input.sessionToken,
		})

		return deleteBookResp
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

	async createBookWithChapters(input: {
		app: INestApplication
		sessionToken: any
		book: {
			author?: null | string
			name?: null | string
			note?: null | string
		}
		chapters: Array<{
			name?: null | string
			header?: null | string
			content?: null | string
			note?: null | string
		}>
	}) {
		// First create the book
		const createBookResp = await this.createBookPrivate({
			app: input.app,
			sessionToken: input.sessionToken,
			book: input.book,
		})

		if (createBookResp.errors) {
			throw new Error(`Failed to create book: ${JSON.stringify(createBookResp.errors)}`)
		}

		const bookId = createBookResp.data.book_create.id

		// Create all chapters
		const createdChapters = []
		for (const chapterData of input.chapters) {
			const createChapterResp = await bookChapterUtils.createBookChapter({
				app: input.app,
				sessionToken: input.sessionToken,
				bookChapter: {
					bookId,
					...chapterData,
				},
			})

			if (createChapterResp.errors) {
				throw new Error(`Failed to create chapter: ${JSON.stringify(createChapterResp.errors)}`)
			}

			createdChapters.push(createChapterResp.data.book_chapter_create)
		}

		return {
			book: createBookResp.data.book_create,
			chapters: createdChapters,
		}
	},
}
