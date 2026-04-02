import { WordResolver } from './word.resolver'

export const wordResolversDesc: Record<keyof typeof WordResolver.prototype, string> = {
	getWord: 'Get word with transcription and audio pronunciations',
	createWord: 'Create a new word',
}
