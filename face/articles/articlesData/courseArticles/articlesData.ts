import ArticleType from '../articleType'
import presentSimplePositive1 from './1_presentSimplePositive-1/presentSimplePositive-1'
import presentSimplePositive2 from './2_presentSimplePositive-2/presentSimplePositive-2'
import presentSimplePositive3 from './3_presentSimplePositive-3/presentSimplePositive-3'
// import toBePositive from './2_toBePositive/toBePositive'
// import adjectives from './3_adjectives/adjectives'
// import indefiniteArticle from './4_indefiniteArticle/indefiniteArticle'
// import pluralOfNouns from './5_pluralOfNouns/pluralOfNouns'
// import beNegativeAndQuestion from './6_beNegativeAndQuestion/beNegativeAndQuestion'
// import demonstrativePronouns from './7_demonstrativePronouns/demonstrativePronouns'
// import possessivePronouns from './8_possessivePronouns/possessivePronouns'
// import possessiveNouns from './9_possessiveNouns/possessiveNouns'
// import the from './10_the/the'
// import adjectivesDegreesOfComparison from './11_adjectivesDegreesOfComparison/adjectivesDegreesOfComparison'
// import beShort from './12_beShort/beShort'
// import presentSimple from './13_presentSimple/presentSimple'
// import compareBeAndSimple from './14_compareBeAndSimple/compareBeAndSimple'
// import simpleQuestionAndNegative from './15_simpleQuestionAndNegative/simpleQuestionAndNegative'
// import strikeDo from './16_strikeDo/strikeDo'
// import shortAnswers from './17_shortAnswers/shortAnswers'
// import tagQuestion from './18_tagQuestion/tagQuestion'
// import questionsWithDenial from './19_questionsWithDenial/questionsWithDenial'
// import personalPronounsAsObject from './20_personalPronounsAsObject/personalPronounsAsObject'
// import zeroArticle from './21_zeroArticle/zeroArticle'
// import prepositionOf from './22_prepositionOf/prepositionOf'
// import muchAndMany from './23_muchAndMany/muchAndMany'
// import fewAndLittle from './24_fewAndLittle/fewAndLittle'
// import particleTo from './25_particleTo/particleTo'
// import prepositionTo from './26_prepositionTo/prepositionTo'
// import prepositionInPlace from './27_prepositionInPlace/prepositionInPlace'
// import prepositionAtPlace from './28_prepositionAtPlace/prepositionAtPlace'
// import prepositionOnPlace from './29_prepositionOnPlace/prepositionOnPlace'

// Список статей учебника
const rowArticles: ArticleType.Art[] = [
	presentSimplePositive1,
	presentSimplePositive2,
	presentSimplePositive3,
	// toBePositive,
	// adjectives,
	// indefiniteArticle,
	// pluralOfNouns,
	// beNegativeAndQuestion,
	// demonstrativePronouns,
	// possessivePronouns,
	// possessiveNouns,
	// the,
	// adjectivesDegreesOfComparison,
	// beShort,
	// presentSimple,
	// compareBeAndSimple,
	// simpleQuestionAndNegative,
	// strikeDo,
	// shortAnswers,
	// tagQuestion,
	// questionsWithDenial,
	// personalPronounsAsObject,
	// zeroArticle,
	// prepositionOf,
	// muchAndMany,
	// fewAndLittle,
	// particleTo,
	// prepositionTo,
	// prepositionInPlace,
	// prepositionAtPlace,
	// prepositionOnPlace,
]

const articles: ArticleType.Art[] = rowArticles.map((article, i) => {
	const newArticle = { ...article }
	newArticle.meta.number = i + 1

	return newArticle
})

export default articles
