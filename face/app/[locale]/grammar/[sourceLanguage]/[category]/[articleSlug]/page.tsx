import TopicPage from '_pages/grammar/topicPage/TopicPage/TopicPage'

type ArticlePageProps = {
	params: Promise<{
		sourceLanguage: string
		category: string
		articleSlug: string
	}>
}

export default async function GrammarArticleRoute(props: ArticlePageProps) {
	const { sourceLanguage, category, articleSlug } = await props.params

	return <TopicPage sourceLanguage={sourceLanguage} category={category} articleSlug={articleSlug} />
}
