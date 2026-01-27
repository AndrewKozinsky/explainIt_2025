export namespace PopulatedSubtitlesStructure {
	export type Structure = {
		subtitles: (Subtitle | SpeechlessBar)[]
		sentences: Sentence[]
		// selected: Selected
		// Идентификатор проигрываемого субтитра или паузы (speechlessBar)
		playingSubtitleOrSpeechlessBarId: number
	}

	// Полоса между диалогами
	export type SpeechlessBar = {
		type: 'speechlessBar'
		id: number
		// Start time in seconds
		fromSeconds: number
		// End time in seconds
		toSeconds: number
	}

	export type Subtitle = {
		type: 'subtitle'
		id: number
		// Start time (00:00:01,000)
		from: string
		// Start time in seconds
		fromSeconds: number
		// End time (00:00:02,000)
		to: string
		// End time in seconds
		toSeconds: number
		// Texts
		texts: {
			text: string
			sentenceId: number
			wordOffset: number
		}[]
	}

	type Sentence = {
		id: number
		text: string
		// translation?: string
	}

	/*export type Selected = {
		sentenceId: null | number
		wordIds: number[]
	}*/
}
