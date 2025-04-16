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
		audio: true,
	},
	we_love_winter: {
		sentence: 'We love winter.',
		transcription: 'wi lʌv ˈwɪn.tɚ',
		audio: true,
	},
	i_feel_happy: {
		sentence: 'I feel happy.',
		transcription: 'aɪ fil ˈhæpi',
		audio: true,
	},
	we_work_full_time: {
		sentence: 'We work full-time.',
		transcription: 'wi wɝk fʊl-taɪm',
		audio: true,
	},
	they_wear_suits: {
		sentence: 'They wear suits.',
		transcription: 'ðeɪ wɛr suːts',
		audio: true,
	},
	dasha_loves_raw_vegetables: {
		sentence: 'Dasha loves raw vegetables.',
		transcription: 'ˈdɑːʃə lʌvz rɔː ˈvedʒtəbəlz',
		audio: false,
	},
} satisfies Record<string, ITranscription>
