import type { FramePart } from './frameParts'

export function getRootClassName(isExpressionHighlighted: boolean) {
	return isExpressionHighlighted ? 'segmented-text segmented-text--expression' : 'segmented-text'
}

export function getGapClassName(framePart?: FramePart) {
	return framePart === 'bridge' ? 'segmented-text__gap segmented-text__gap--bridge' : 'segmented-text__gap'
}

export function getWordClassName(framePart?: FramePart) {
	if (!framePart) return 'segmented-text__word'
	if (framePart === 'single') return 'segmented-text__word segmented-text__word--highlighted'

	return `segmented-text__word segmented-text__word--highlighted segmented-text__word--${framePart}`
}
