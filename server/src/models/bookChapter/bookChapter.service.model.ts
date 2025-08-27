import { BookLiteServiceModel } from '../book/book.service.model'

export type BookChapterServiceModel = {
	id: number
	bookId: number
	name: string | null
	header: string | null
	content: string | null
	note: string | null
	book: BookLiteServiceModel
}

export type BookChapterLiteServiceModel = {
	id: number
	bookId: number
	name: string | null
	header: string | null
	note: string | null
}
