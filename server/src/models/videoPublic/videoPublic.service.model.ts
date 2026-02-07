import { Language } from 'utils/languages'

// TODO: fileName, fileS3Key, fileUrl, originalContent, processedContent are always have value!
export type VideoPublicServiceModel = {
	id: number
	name: string | null
	year: number | null
	languageCode: Language
	fileUrl: string | null
	fileName: string | null
	fileS3Key: string | null
	originalContent: null | string
	processedContent: null | string
	contentType: 'text' | 'subtitles'
}
