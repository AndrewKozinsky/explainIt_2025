import { INestApplication } from '@nestjs/common'
import { BookPublicOutModel } from '../../src/models/bookPublic/bookPublic.out.model'
import { queries } from '../../src/features/db/queries'
import { makeGraphQLReq } from '../makeGQReq'

type BookConfig = {
	book: {
		author: string
		name: string
		note: string
		cover: string
	}
	chapters: {
		name: string
		header: string
		data: {
			sentence: string
			translate: string
		}[]
	}[]
}

export const bookPublicUtils = {
	matchBookPublicOutWithBookPublicConfig(bookOut: BookPublicOutModel, bookConfig: BookConfig) {
		expect(bookConfig.book.author).toBe(bookOut.author)
		expect(bookConfig.book.name).toBe(bookOut.name)
		expect(bookConfig.book.note).toBe(bookOut.note)
		expect(bookConfig.book.cover).toBe(bookOut.cover)
		expect(bookConfig.chapters.length).toBe(bookOut.chapters.length)
	},

	async getBooks(app: INestApplication) {
		const getBooksPublicQuery = queries.bookPublic.getBooks()

		const [getBooksPublicResp] = await makeGraphQLReq(app, getBooksPublicQuery)

		return getBooksPublicResp
	},
}
