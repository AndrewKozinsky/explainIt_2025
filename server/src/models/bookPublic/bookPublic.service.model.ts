import { Language } from 'utils/languages'
import { BookChapterLiteServiceModel } from '../bookChapter/bookChapter.service.model'

export type BookPublicServiceModel = {
	id: number
	author: string
	name: string
	note: string
	cover: string
	lang: Language
	chapters: BookChapterLiteServiceModel[]
}
