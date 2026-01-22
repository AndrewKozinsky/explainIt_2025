import { useWatchingStore } from '_pages/video/watching/watchingStore'

export function useGetCurrentLexemes() {
	const lexemTabId = useWatchingStore((s) => s.lexemTabId)
	const analysis = useWatchingStore((s) => s.analysis)

	if (analysis.analysis.type !== 'data' || !analysis.analysis.lexemes?.length) {
		return null
	}

	const lexem = analysis.analysis.lexemes.find((lexeme) => {
		return lexeme.pos === lexemTabId
	})

	if (!lexem || !lexem.tr) {
		return null
	}

	return lexem
}
