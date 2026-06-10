import React from 'react'
import ItemsGrid from 'ui/ItemsGrid/ItemsGrid'
import { languages } from 'utils/languages'
import { pageUrls } from 'utils/pageUrls'
import GrammarCard from '_pages/grammar/common/GrammarCard/GrammarCard'
import { getLanguagesPageData } from './fn/getLanguagesPageData'

async function LanguagesPage() {
	const visibleLanguageKeys = await getLanguagesPageData()

	return (
		<ItemsGrid>
			{visibleLanguageKeys.map((languageKey) => (
				<GrammarCard
					key={languageKey}
					href={pageUrls.grammar.language(languageKey).path}
					title={languages[languageKey].name}
				/>
			))}
		</ItemsGrid>
	)
}

export default LanguagesPage
