import { BookChapterLiteServiceModel } from '../bookChapter/bookChapter.service.model'

export type BookServiceModel = {
	id: number
	author: null | string
	name: null | string
	sourceLanguageCode: null | string
	note: null | string
	userId: number
	chapters: BookChapterLiteServiceModel[]
}

export type BookLiteServiceModel = {
	id: number
	author: string | null
	name: string | null
	languageCode: null | string
	note: string | null
	userId: null | number
}
