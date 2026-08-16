export type VideoServiceModel = {
	id: number
	type: 'public' | 'private'
	userId: null | number
	name: null | string
	about: null | string
	sourceLanguageCode: string
	youtubeVideoId: null | string
	fileUrl: null | string
	fileName: null | string
	fileS3Key: null | string
	originalContent: null | string
	processedContent: null | string
	contentType: 'text' | 'subtitles'
	fileSizeMb: number
	durationSec: number
	coverFileName: null | string
	coverFileS3Key: null | string
	isCoverFileUploaded: boolean
	coverUrl: null | string
	subtitlesSource: string
	subtitlesStatus: string
	subtitlesErrorCode: null | string
	subtitlesJobId: null | string
	proficiencyLevel: null | number
	topic: null | string
	learnabilityScore: null | number
}
