import { BookChapterLiteServiceModel } from '../bookChapter/bookChapter.service.model'

export type BookServiceModel = {
	id: number
	type: 'public' | 'private'
	author: null | string
	name: null | string
	sourceLanguageCode: null | string
	note: null | string
	userId: null | number
	coverFileName: null | string
	coverFileS3Key: null | string
	isCoverFileUploaded: boolean
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
