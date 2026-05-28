/*export function computeInsertAtCaret(
	current: string,
	textarea: HTMLTextAreaElement | null,
	text: string,
): { next: string; caret: number } {
	if (!textarea || document.activeElement !== textarea) {
		const next = current + text
		return { next, caret: next.length }
	}

	const start = textarea.selectionStart ?? current.length
	const end = textarea.selectionEnd ?? current.length

	const next = current.slice(0, start) + text + current.slice(end)
	const caret = start + text.length
	return { next, caret }
}*/

/*export function applyCaret(textarea: HTMLTextAreaElement | null, caret: number) {
	if (!textarea) return
	try {
		textarea.focus()
		textarea.setSelectionRange(caret, caret)
	} catch {}
}*/
