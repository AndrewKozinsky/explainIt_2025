// import { readStream } from 'utils/sse/readStream'

/*export async function readTranslationStream(
	url: string,
	options?: {
		onPartial?: (translation: string, analysis: null | string) => void
	},
) {
	return await readStream(url, {
		onChunk: (_chunk, fullText) => {
			const parsed = parseTranslationAndAnalysisSoFar(fullText)
			options?.onPartial?.(parsed.translation, parsed.analysis)
		},
	})
}*/

/*export function parseTranslationAndAnalysisSoFar(fullText: string): { translation: string; analysis: null | string } {
	const trimmed = fullText.trimStart()
	const dividerIndex = trimmed.search(/\n\s*\n/)

	if (dividerIndex === -1) {
		return {
			translation: trimmed.trim(),
			analysis: null,
		}
	}

	const translation = trimmed.slice(0, dividerIndex).trim()
	const analysis = trimmed
		.slice(dividerIndex)
		.replace(/^\n\s*\n/, '')
		.trim()

	return {
		translation,
		analysis: analysis ? analysis : null,
	}
}*/
