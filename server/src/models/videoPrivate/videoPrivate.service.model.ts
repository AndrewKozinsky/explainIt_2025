import { Language } from 'utils/languages'

export type VideoPrivateServiceModel = {
	id: number
	name: string | null
	year: number | null
	languageCode: Language
	fileUrl: string | null
	originalContent: null | string
	processedContent: null | string
	contentType: 'text' | 'subtitles'
	userId: number
	fileSizeMb: number
}
