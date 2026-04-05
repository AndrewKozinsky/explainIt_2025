// Make text flat: remove line breaks and collapse excessive whitespace
export function dryText(text: string) {
	// Replace CRLF/CR/LF with spaces, collapse multiple spaces/tabs, and trim
	return text
		.replace(/[\r\n]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

export function removeBOM(text: string) {
	return text.replace(/^\uFEFF/, '')
}

/**
 * Removes screen alignment tags from text.
 * These are subtitle formatting tags like {\an1} through {\an9} that control
 * text positioning on screen (1=bottom-left, 2=bottom-center, etc.).
 *
 * @param text - The input string potentially containing alignment tags
 * @returns The string with all {\an1} through {\an9} tags removed
 *
 * @example
 * removeAlignmentTags('Hello {\an8}World') // Returns 'Hello World'
 * removeAlignmentTags('{\an5}Centered text') // Returns 'Centered text'
 */
export function removeAlignmentTags(text: string) {
	return text.replace(/\{\\an[1-9]\}/g, '')
}

/**
 * Removes leading dash markers from each line of multiline text.
 * Strips "- " pattern at the beginning of each line, commonly used
 * for bullet points or dialogue markers in subtitles.
 *
 * @param text - The input multiline string
 * @returns The string with leading "- " removed from each line
 *
 * @example
 * removeLeadingDashes('- Hello\n- World') // Returns 'Hello\nWorld'
 * removeLeadingDashes('- First line\n- Second line') // Returns 'First line\nSecond line'
 */
export function removeLeadingDashes(text: string) {
	return text.replace(/^- /gm, '').replace(/\n- /g, '\n')
}

/**
 * Removes italic HTML tags from text.
 * Strips <i> and </i> tags commonly used for emphasis in subtitles.
 *
 * @param text - The input string potentially containing italic tags
 * @returns The string with all <i> and </i> tags removed
 *
 * @example
 * removeItalicTags('<i>Hello</i> World') // Returns 'Hello World'
 * removeItalicTags('<i>First</i>\n<i>Second</i>') // Returns 'First\nSecond'
 */
export function removeItalicTags(text: string) {
	return text.replace(/<\/?i>/g, '')
}
