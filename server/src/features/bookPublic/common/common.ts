export type ChapterData = {
	name: string
	header: string
	data: {
		sentence: string
		translate: string
		analysis?: string
	}[]
}
