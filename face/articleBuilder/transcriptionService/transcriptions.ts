export type ITranscription = {
	sentence: string
	transcription: string
	audio: null | string
}

export const transcriptions = {
	i_learn_english: {
		sentence: 'I learn English',
		transcription: 'aɪ lɜːn ˈɪŋɡlɪʃ',
		audio: '12',
	},
} satisfies Record<string, ITranscription>
