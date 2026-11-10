import type { FramePart } from './frameParts'

export function getRootClassName(isExpressionHighlighted: boolean) {
	return isExpressionHighlighted ? 'segmented-text segmented-text--expression' : 'segmented-text'
}

/**
 * hoverPart — часть рамки подсветки (наведение или фокус), selectedPart — часть заливки слов, выбранных кликом.
 * Мостик между выбранными словами тоже заливается, чтобы выражение выглядело одним блоком.
 */
export function getGapClassName(hoverPart?: FramePart, selectedPart?: FramePart) {
	const classNames = ['segmented-text__gap']

	if (hoverPart === 'bridge') classNames.push('segmented-text__gap--bridge')
	if (selectedPart === 'bridge') classNames.push('segmented-text__gap--selected-bridge')

	return classNames.join(' ')
}

export function getWordClassName(hoverPart?: FramePart, selectedPart?: FramePart) {
	const classNames = ['segmented-text__word']

	if (hoverPart) classNames.push('segmented-text__word--highlighted')
	if (hoverPart && hoverPart !== 'single') classNames.push(`segmented-text__word--${hoverPart}`)
	if (selectedPart) classNames.push('segmented-text__word--selected')
	if (selectedPart && selectedPart !== 'single') classNames.push(`segmented-text__word--selected-${selectedPart}`)

	return classNames.join(' ')
}
