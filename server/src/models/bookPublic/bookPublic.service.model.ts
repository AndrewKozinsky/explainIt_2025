import { Language } from 'utils/languages'
import { BookChapterLiteServiceModel } from '../bookChapter/bookChapter.service.model'

export type BookPublicServiceModel = {
	id: number
	author?: string | null
	name: string
	note: string
	covers: string[]
	coverBackgroundColor: string
	sourceLanguageCode: Language
	chapters: BookChapterLiteServiceModel[]
	freeToUse: boolean
}
