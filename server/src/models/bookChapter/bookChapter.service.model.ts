import { BookLiteServiceModel } from '../book/book.service.model'

export type BookChapterServiceModel = {
	id: number
	name: string | null
	header: string | null
	note: string | null
	originalContent: string | null
	sentences: {
		id: number
		startOffset: number
		length: number
	}[]
	book: BookLiteServiceModel
}

export type BookChapterLiteServiceModel = {
	id: number
	bookId: number
	name: string | null
	header: string | null
	note: string | null
}
