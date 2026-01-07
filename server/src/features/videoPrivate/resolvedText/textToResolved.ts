import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { plainTextToResolved } from './plainTextToResolved'
import { ResolvedSubtitlesStructure } from './resolvedSubtitlesStructure'
import { ResolvedTextStructure } from './resolvedTextStructure'
import { subtitlesToResolved } from './subtitlesToResolved'

export async function textToResolved(mainConfigService: MainConfigService, userText?: null | string) {
	if (!userText) return ''

	const userTextType = getUserTextType(userText)

	let resolvedText: ResolvedTextStructure.Structure | ResolvedSubtitlesStructure.Structure = {
		type: 'plainText',
		sentences: [],
	}

	if (userTextType === 'plainText') {
		resolvedText = await plainTextToResolved(mainConfigService, userText)
	} else if (userTextType === 'subtitles') {
		resolvedText = await subtitlesToResolved(mainConfigService, userText)
	}

	return JSON.stringify(resolvedText)
}

/**
 * Detects the user input type.
 *
 * Supported formats:
 * - `plainText`: an ordinary paragraph(s) of text.
 * - `subtitles`: SRT-like subtitles, where blocks usually look like:
 *
 * ```
 * 1
 * 00:00:00,160 --> 00:00:02,560
 * Some text
 * ```
 *
 * Detection is heuristic-based (no strict parsing):
 * - Looks for SRT timecode lines (`HH:MM:SS,mmm --> HH:MM:SS,mmm` or with `.`).
 * - Optionally checks that timecode lines are preceded by numeric indices.
 */
function getUserTextType(userText: string): 'plainText' | 'subtitles' {
	const normalized = userText
		.replace(/^\uFEFF/, '')
		.replace(/\r\n?/g, '\n')
		.trim()

	if (!normalized) {
		return 'plainText'
	}

	const lines = normalized
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l.length > 0)

	if (lines.length < 3) {
		return 'plainText'
	}

	const timecodeLineRe = /^\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,.]\d{3}(\s+.*)?$/
	const indexLineRe = /^\d+$/

	let timecodeLines = 0
	let indexBeforeTimecodeLines = 0

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		if (!timecodeLineRe.test(line)) continue

		timecodeLines++

		if (i > 0 && indexLineRe.test(lines[i - 1])) {
			indexBeforeTimecodeLines++
		}
	}

	// Typical SRT has many timecode lines; require at least 2 to avoid false positives.
	// Also accept a single timecode line if it's clearly part of SRT (preceded by index).
	if (timecodeLines >= 2 || (timecodeLines === 1 && indexBeforeTimecodeLines === 1)) {
		return 'subtitles'
	}

	return 'plainText'
}
