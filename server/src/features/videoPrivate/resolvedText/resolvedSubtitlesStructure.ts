// Тип данных для структуры текста приходящий с сервера
export namespace ResolvedSubtitlesStructure {
	export type Structure = {
		type: 'subtitles'
		subtitles: Subtitle[]
		sentences: Sentence[]
	}

	export type Subtitle = {
		// Start time
		from: string
		// End time
		to: string
		// Texts
		ts: {
			// Text
			t: string
			// Sentence id
			sId: number
		}[]
	}

	type Sentence = {
		// Sentence id
		id: number
		// Sentence
		s: string
		// Translation
		t?: string
	}
}
