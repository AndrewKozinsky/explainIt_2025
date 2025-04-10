import { transcriptions } from './transcriptions'

const transcriptionService = {
	getTranscriptionBySentence: (sentence: string) => {
		const clearedSentence = transcriptionService.cleanString(sentence)

		return transcriptions[clearedSentence] || null
	},
	getTranscriptionByKey: (key: keyof typeof transcriptions) => {
		return transcriptions[key]
	},

	/**
	 * It takes string then converts it into another string.
	 * New string doesn't have apostrophe or any symbols similar to apostrophe.
	 * All spaces converts into underscore.
	 * Dots removes.
	 * Capital letters converts to lowercase. Examples:
	 * I learn English. -> i_learn_english
	 * I'll be there -> ill_be_there
	 * He doesn't like  it. -> he_doesnt_like_it
	 * @param input — original string
	 */
	cleanString(input: string) {
		return input
			.toLowerCase()
			.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035\u0027]/g, '') // remove apostrophes and similar symbols
			.replace(/\s+/g, '_') // replace spaces with underscores
			.replace(/\./g, '') // remove dots
			.replace(/[^\w_]/g, '') as keyof typeof transcriptions
	},
}

export default transcriptionService
