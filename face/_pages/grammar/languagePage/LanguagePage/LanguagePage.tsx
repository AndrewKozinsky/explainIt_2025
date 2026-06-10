'use client'

import React from 'react'
import { useGrammarConceptsList } from 'graphql'
import { useLocale } from 'next-intl'
import { SectionWithHeader } from 'ui/SectionWithHeader/SectionWithHeader'
import { getCategoryDisplayName } from 'utils/categoryDisplayNames'
import { pageUrls } from 'utils/pageUrls'
import GrammarLink from '_pages/grammar/topicPage/GrammarLink/GrammarLink'

type LanguagePageProps = {
	sourceLanguage: string
}

function LanguagePage(props: LanguagePageProps) {
	const { sourceLanguage } = props
	const targetLanguage = useLocale()

	const { data, loading, error } = useGrammarConceptsList({
		variables: {
			input: {
				sourceLanguage,
				targetLanguage,
			},
		},
	})

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error.message}</p>
	}

	const categories = data?.grammar_concepts_list.categories ?? []

	if (!categories.length) {
		return <p>No grammar articles available for this language yet.</p>
	}

	return (
		<div>
			{categories.map((group) => (
				<SectionWithHeader key={group.category} title={getCategoryDisplayName(sourceLanguage, group.category)}>
					{group.articles.map((article) => (
						<GrammarLink
							key={article.id}
							name={article.title}
							href={
								pageUrls.grammar
									.language(sourceLanguage)
									.article(sourceLanguage, article.category, article.slug).path
							}
						/>
					))}
				</SectionWithHeader>
			))}
		</div>
	)
}

export default LanguagePage
