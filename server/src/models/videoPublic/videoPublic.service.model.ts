import { Language } from 'utils/languages'

export type VideoPublicServiceModel = {
	id: number
	name: string
	year: number | null
	languageCode: Language
	note: string | null
	covers: string[]
	fileUrl: string
	fileName: string
	fileS3Key: string
	originalContent: string
	processedContent: string
	contentType: 'text' | 'subtitles'
	freeToUse: boolean
}
