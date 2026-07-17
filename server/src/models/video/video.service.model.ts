export type VideoServiceModel = {
	id: number
	videoCollectionId: number
	name: null | string
	note: null | string
	fileUrl: null | string
	fileName: null | string
	fileS3Key: null | string
	originalContent: null | string
	processedContent: null | string
	contentType: 'text' | 'subtitles'
	fileSizeMb: number
	fileDurationSec: null | number
}
