// import { TabConfig } from 'ui/Tabs/Tabs'
// import { useWatchingStore } from '_pages/video/watching/watchingStore'

/*export function useGetPartOfSpeechTabsConfig(): TabConfig[] {
	const analysis = useWatchingStore((s) => s.analysis)
	const updateLexemTabId = useWatchingStore((s) => s.updateLexemTabId)

	if (analysis.analysis.type !== 'data' || !analysis.analysis.lexemes) {
		return []
	}

	return analysis.analysis.lexemes.map((lexema, i) => {
		const id = lexema.pos!.toString()

		const labelMapper = {
			существительное: 'сущ.',
			прилагательное: 'прил.',
			причастие: 'прич.',
			глагол: 'гл.',
			наречие: 'нареч.',
			междометие: 'междом.',
			местоимение: 'мест.',
			частица: 'частица',
			союз: 'союз',
		}
		const label = labelMapper[lexema.pos as 'причастие'] ?? lexema.pos ?? 'н/д'

		return {
			id,
			label,
			onClick: () => updateLexemTabId(id),
		}
	})
}*/
