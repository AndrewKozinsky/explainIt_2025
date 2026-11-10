import type { FramePart } from './frameParts'

export function getRootClassName(isExpressionHighlighted: boolean) {
	return isExpressionHighlighted ? 'clickable-text clickable-text--expression' : 'clickable-text'
}

/**
 * hoverPart — часть рамки подсветки (наведение или фокус), selectedPart — часть заливки слов, выбранных кликом.
 * Мостик между выбранными словами тоже заливается, чтобы выражение выглядело одним блоком.
 */
export function getGapClassName(hoverPart?: FramePart, selectedPart?: FramePart) {
	const classNames = ['clickable-text__gap']

	if (hoverPart === 'bridge') classNames.push('clickable-text__gap--bridge')
	if (selectedPart === 'bridge') classNames.push('clickable-text__gap--selected-bridge')

	return classNames.join(' ')
}

export function getWordClassName(hoverPart?: FramePart, selectedPart?: FramePart) {
	const classNames = ['clickable-text__word']

	if (hoverPart) classNames.push('clickable-text__word--highlighted')
	if (hoverPart && hoverPart !== 'single') classNames.push(`clickable-text__word--${hoverPart}`)
	if (selectedPart) classNames.push('clickable-text__word--selected')
	if (selectedPart && selectedPart !== 'single') classNames.push(`clickable-text__word--selected-${selectedPart}`)

	return classNames.join(' ')
}
