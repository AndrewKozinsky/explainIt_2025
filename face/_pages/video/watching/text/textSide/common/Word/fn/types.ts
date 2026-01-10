type BaseWordProps = {
	wordId: number
	wordValue: string
}

type PlainTextWordProps = BaseWordProps & {
	contentType: 'plainText'
	sentenceId: number
}

type SubtitlesWordProps = BaseWordProps & {
	contentType: 'subtitles'
	subtitleId: number
	sentenceId: number
}

export type WordProps = PlainTextWordProps | SubtitlesWordProps

export const EMPTY_WORD_IDS: number[] = []
