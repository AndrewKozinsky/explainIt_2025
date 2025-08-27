import { BookChapterLiteServiceModel } from '../bookChapter/bookChapter.service.model'

export type BookServiceModel = {
	id: number
	author: string | null
	name: string | null
	note: string | null
	userId: number
	chapters: BookChapterLiteServiceModel[]
}

export type BookLiteServiceModel = {
	id: number
	author: string | null
	name: string | null
	note: string | null
	userId: number
}
