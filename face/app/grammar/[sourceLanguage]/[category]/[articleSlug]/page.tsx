// import GrammarArticlePage from '_pages/grammar/GrammarArticlePage/GrammarArticlePage'

type ArticlePageProps = {
	params: Promise<{
		sourceLanguage: string
		category: string
		articleSlug: string
	}>
}

export default async function GrammarArticleRoute(props: ArticlePageProps) {
	const { sourceLanguage, category, articleSlug } = await props.params

	// return <GrammarArticlePage sourceLanguage={sourceLanguage} category={category} articleSlug={articleSlug} />
	return null
}
