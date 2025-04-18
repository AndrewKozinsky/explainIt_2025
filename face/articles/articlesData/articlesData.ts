import ArticleType from '../articleTypes/articleType'
import the from './5_the/the'
import presentSimplePositive1 from './1_presentSimplePositive-1/presentSimplePositive-1'
import presentSimplePositive2 from './2_presentSimplePositive-2/presentSimplePositive-2'
import presentSimplePositive3 from './3_presentSimplePositive-3/presentSimplePositive-3'
import indefiniteArticle from './4_indefiniteArticle/indefiniteArticle'
import personalPronouns from './6_personalPronouns/personalPronouns'

// Список статей учебника
const rowArticles: ArticleType.Art[] = [
	presentSimplePositive1,
	presentSimplePositive2,
	presentSimplePositive3,
	indefiniteArticle,
	the,
	personalPronouns,
]

const articles: ArticleType.Art[] = rowArticles.map((article, i) => {
	const newArticle = { ...article }
	newArticle.meta.number = i + 1

	return newArticle
})

export default articles
