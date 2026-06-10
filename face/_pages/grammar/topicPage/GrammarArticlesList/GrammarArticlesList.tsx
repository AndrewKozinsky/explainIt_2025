'use client'

import { useGrammarConceptsList } from 'graphql'
import { useLocale } from 'next-intl'
import { getCategoryDisplayName } from 'utils/categoryDisplayNames'
import { pageUrls } from 'utils/pageUrls'
import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
import GrammarLink from '../GrammarLink/GrammarLink'

type GrammarArticlesListProps = {
	sourceLanguage: string
	category: string
}

export default function GrammarArticlesList(props: GrammarArticlesListProps) {
	const { sourceLanguage, category } = props
	const targetLanguage = useLocale()

	const { data, loading } = useGrammarConceptsList({
		variables: {
			input: {
				sourceLanguage,
				targetLanguage,
			},
		},
	})

	if (loading) {
		return null
	}

	const currentCategory = data?.grammar_concepts_list.categories.find((group) => group.category === category)

	if (!currentCategory || !currentCategory.articles.length) {
		return null
	}

	return (
		<SectionWithHeader title={getCategoryDisplayName(sourceLanguage, category)}>
			{currentCategory.articles.map((article) => (
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
	)
}
