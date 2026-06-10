import React from 'react'
import GrammarArticlesList from '../GrammarArticlesList/GrammarArticlesList'
import TopicContent from '../TopicContent/TopicContent'
import './TopicPage.scss'

type TopicPageProps = {
	sourceLanguage: string
	category: string
	articleSlug: string
}

function TopicPage(props: TopicPageProps) {
	const { sourceLanguage, category, articleSlug } = props

	return (
		<div className='topic-page'>
			<div className='topic-page__sidebar'>
				<GrammarArticlesList sourceLanguage={sourceLanguage} category={category} />
			</div>
			<TopicContent sourceLanguage={sourceLanguage} category={category} articleSlug={articleSlug} />
		</div>
	)
}

export default TopicPage
