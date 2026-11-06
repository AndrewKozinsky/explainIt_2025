const HIDDEN_TEXT_PREVIEW_LENGTH = 4

/** Начало реплики и многоточие: показывает, что текст есть, но скрыт. */
export function getHiddenTextPreview(content: string) {
	const textStart = Array.from(content.trim()).slice(0, HIDDEN_TEXT_PREVIEW_LENGTH).join('')
	return `${textStart}…`
}
