/** Один cue (строка субтитров) после парсинга SRT */
export type SubtitleCue = {
	startTimeMs: number
	endTimeMs: number
	text: string // текст после dryText()
	orderIndex: number
}

/** Cue с вычисленными позициями в склеенном plain text */
export type CueWithOffset = SubtitleCue & {
	startOffset: number // позиция в plainText
	length: number // длина текста в plainText
}
