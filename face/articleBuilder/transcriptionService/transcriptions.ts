export type ITranscription = {
	sentence: string
	transcription: string
	audio: boolean
}

export const transcriptions = {
	i_learn_english: {
		sentence: 'I learn English',
		transcription: 'aɪ lɜːn ˈɪŋɡlɪʃ',
		audio: true,
	},
	they_cook_dinner_together: {
		sentence: 'They cook dinner together',
		transcription: 'ðeɪ kʊk ˈdɪnər təˈɡɛðər',
		audio: false,
	},
} satisfies Record<string, ITranscription>
