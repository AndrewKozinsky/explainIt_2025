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
