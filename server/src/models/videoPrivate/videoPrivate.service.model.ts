import { Language } from 'utils/languages'

export type VideoPrivateServiceModel = {
	id: number
	name: null | string
	year: null | number
	languageCode: null | Language
	fileUrl: null | string
	originalContent: null | string
	processedContent: null | string
	contentType: 'text' | 'subtitles'
	userId: number
	fileSizeMb: number
}
