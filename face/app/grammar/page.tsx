import GrammarCategoriesList from '_pages/grammar/GrammarCategoriesList/GrammarCategoriesList'

export default function GrammarPage() {
	return (
		<>
			<div className='grammar-page-content__left'>
				<GrammarCategoriesList />
			</div>
			<div className='grammar-page-content__right'>
				<p>Выберите категорию грамматики из списка слева.</p>
			</div>
		</>
	)
}
