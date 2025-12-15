import { BookChapterLiteServiceModel } from '../bookChapter/bookChapter.service.model'

export type BookPublicServiceModel = {
	id: number
	author: string
	name: string
	note: string
	cover: string
	chapters: BookChapterLiteServiceModel[]
}

/*export type BookPublicLiteServiceModel = {
	id: number
	author: string | null
	name: string | null
	note: string | null
}*/
