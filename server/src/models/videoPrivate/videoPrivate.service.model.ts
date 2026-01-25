export type VideoPrivateServiceModel = {
	id: number
	name: string | null
	fileUrl: string | null
	originalContent: null | string
	processedContent: null | string
	userId: number
	fileSizeMb: number
}
