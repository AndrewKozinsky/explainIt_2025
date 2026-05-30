import GrammarArticlesList from '_pages/grammar/GrammarArticlesList/GrammarArticlesList'

type CategoryLayoutProps = {
	children: React.ReactNode
	params: Promise<{ sourceLanguage: string; category: string }>
}

export default async function GrammarCategoryLayout(props: CategoryLayoutProps) {
	const { sourceLanguage, category } = await props.params

	return (
		<>
			<div className='grammar-page-content__left'>
				<GrammarArticlesList sourceLanguage={sourceLanguage} category={category} />
			</div>
			<div className='grammar-page-content__right'>{props.children}</div>
		</>
	)
}
