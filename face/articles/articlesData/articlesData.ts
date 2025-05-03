import ArticleType from '../articleTypes/articleType'
import presentSimpleQuestion from './10_presentSimpleQuestion/presentSimpleQuestion'
import toBePresentQuestion from './11_toBePresentQuestion/toBePresentQuestion'
import presentSimpleNegative from './12_presentSimpleNegative/presentSimpleNegative'
import toBePresentNegative from './13_toBePresentNegative/toBePresentNegative'
import demonstrativePronounce from './14_demonstrativePronounce/demonstrativePronounce'
import possessivePronouns from './15_possessivePronouns/possessivePronouns'
import the from './5_the/the'
import presentSimplePositive1 from './1_presentSimplePositive-1/presentSimplePositive-1'
import presentSimplePositive2 from './2_presentSimplePositive-2/presentSimplePositive-2'
import presentSimplePositive3 from './3_presentSimplePositive-3/presentSimplePositive-3'
import indefiniteArticle from './4_indefiniteArticle/indefiniteArticle'
import personalPronouns from './6_personalPronouns/personalPronouns'
import pluralOfNouns from './7_pluralOfNouns/pluralOfNouns'
import phrases_1 from './8_phrases-1/phrases_1'
import toBePresentPositive from './9_toBePresentPositive/toBePresentPositive'

// Список статей учебника
const rowArticles: ArticleType.Art[] = [
	presentSimplePositive1,
	presentSimplePositive2,
	presentSimplePositive3,
	indefiniteArticle,
	the,
	personalPronouns,
	pluralOfNouns,
	phrases_1,
	toBePresentPositive,
	presentSimpleQuestion,
	toBePresentQuestion,
	presentSimpleNegative,
	toBePresentNegative,
	demonstrativePronounce,
	possessivePronouns,
]

const articles: ArticleType.Art[] = rowArticles.map((article, i) => {
	const newArticle = { ...article }
	newArticle.meta.number = i + 1

	return newArticle
})

export default articles
