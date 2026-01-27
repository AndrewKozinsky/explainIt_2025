// import React from 'react'
// import Tabs from 'ui/Tabs/Tabs'
// import { useGetPartOfSpeechTabsConfig } from '_pages/video/watching/text/detailsSide/PhraseAnalysis/fn/lexemesTabsConfig'
// import { useWatchingStore } from '_pages/video/watching/watchingStore'
// import { useGetCurrentLexemes } from './fn/currentLexemes'

/*function Lexemes() {
	const analysis = useWatchingStore((s) => s.analysis)
	if (analysis.analysis.type !== 'data' || !analysis.analysis.lexemes) {
		return null
	}

	return (
		<div className='phrase-analysis__lexemes'>
			<PartOfSpeechTabs />
			<CurrentLexemes />
		</div>
	)
}*/

// export default Lexemes

/*function PartOfSpeechTabs() {
	const lexemTabId = useWatchingStore((s) => s.lexemTabId)
	const tabsConfig = useGetPartOfSpeechTabsConfig()

	if (!tabsConfig.length || tabsConfig.length === 1) {
		return null
	}

	return <Tabs tabsConfig={tabsConfig} currentTabId={lexemTabId} />
}*/

/*function CurrentLexemes() {
	const lexeme = useGetCurrentLexemes()
	if (!lexeme) return null

	return (
		<div className='phrase-analysis__lexemes-list'>
			{lexeme.tr!.map((tr) => {
				return (
					<p className='phrase-analysis__lexemes-rus' key={tr.text}>
						{tr.text}
					</p>
				)
			})}
		</div>
	)
}*/
