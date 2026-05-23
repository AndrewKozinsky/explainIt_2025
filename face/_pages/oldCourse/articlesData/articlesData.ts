import mainConfig from '../../сonsts/mainConfig'
import ArticleType from '../articleTypes/articleType'
import presentSimpleQuestion from './10_presentSimpleQuestion/presentSimpleQuestion'
import toBePresentQuestion from './11_toBePresentQuestion/toBePresentQuestion'
import presentSimpleNegative from './12_presentSimpleNegative/presentSimpleNegative'
import toBePresentNegative from './13_toBePresentNegative/toBePresentNegative'
import personalPronounsAsObject from './14_personalPronounsAsObject/personalPronounsAsObject'
import demonstrativePronounce from './15_demonstrativePronounce/demonstrativePronounce'
import possessivePronouns from './16_possessivePronouns/possessivePronouns'
import pastSimplePositive1 from './17_pastSimplePositive-1/pastSimplePositive-1'
import pastSimplePositive2 from './18_pastSimplePositive-2/pastSimplePositive-2'
import toBePastPositive from './19_toBePastPositive/toBePastPositive'
import pastSimpleQuestion from './20_pastSimpleQuestion/past-simple-question'
import toBePastQuestion from './21_toBePastQuestion/toBePastQuestion'
import pastSimpleNegative from './22_pastSimpleNegative/past-simple-negative'
import toBePastNegative from './23_toBePastNegative/toBePastNegative'
import structure from './24_structure/structure'
import verbAfterVerb from './25_verbAfterVerb/verbAfterVerb'
import imperative from './26_imperative/imperative'
import the from './5_the/the'
import presentSimplePositive1 from './1_presentSimplePositive-1/presentSimplePositive-1'
import presentSimplePositive2 from './2_presentSimplePositive-2/presentSimplePositive-2'
import presentSimplePositive3 from './3_presentSimplePositive-3/presentSimplePositive-3'
import indefiniteArticle from './4_indefiniteArticle/indefiniteArticle'
import personalPronouns from './6_personalPronouns/personalPronouns'
import pluralOfNouns from './7_pluralOfNouns/pluralOfNouns'
import phrases_1 from './8_phrases-1/phrases_1'
import toBePresentPositive from './9_toBePresentPositive/toBePresentPositive'
import testChapter1 from './__test/testChapter-1/testChapter-1'
import testChapter2 from './__test/testChapter-2/testChapter-2'
import testChapter3 from './__test/testChapter-3/testChapter-3'

// Список статей учебника
const rowRealArticles: ArticleType.Art[] = [
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
	personalPronounsAsObject,
	demonstrativePronounce,
	possessivePronouns,
	pastSimplePositive1,
	pastSimplePositive2,
	toBePastPositive,
	pastSimpleQuestion,
	toBePastQuestion,
	pastSimpleNegative,
	toBePastNegative,
	structure,
	verbAfterVerb,
	imperative,
]

const rowTestArticles: ArticleType.Art[] = [testChapter1, testChapter2, testChapter3]

const rowArticles = mainConfig.workingMode === 'localtest' ? rowTestArticles : rowRealArticles

const articles: ArticleType.Art[] = rowArticles.map((article, i) => {
	const newArticle = { ...article }
	newArticle.meta.number = i + 1

	return newArticle
})

export default articles
