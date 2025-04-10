import ArticleBuilder from '../../../../articleBuilder/ArticleBuilder/ArticleBuilder'
// import LearnByHeartButton from '../../../../articleBuilder/components/learnByHeart/LearnByHeartButton/LearnByHeartButton'
// import { ExercisesModal } from '../../../../articleBuilder/exercisesModal'
// import { PageUrls } from '../../../../сonsts/pageUrls'
import { PrevAndNextArticlesNav } from '../../common/ArtPrevAndNextButtons/PrevAndNextArticlesNav'
import ArticleType from '../../../../articleBuilder/articlesData/articleType'
import './ArticleArticleContent.scss'

type WelcomeArticleContentProps = {
	prevArticle: ArticleType.Art | null
	article: ArticleType.ArtArticle
	nextArticle: ArticleType.Art | null
}

/** Содержимое страницы начала уровня языка в курсе */
function ArticleArticleContent(props: WelcomeArticleContentProps) {
	const { prevArticle, article, nextArticle } = props

	return (
		<div className='article-article'>
			<div className='article-article__content'>
				<ArticleBuilder articleContent={article.content} />
			</div>
			<div className='article-article__footer'>
				{/*<LearnByHeartButton article={nextArticle} />*/}
				<PrevAndNextArticlesNav prevArticle={prevArticle} nextArticle={nextArticle} />
				{/*<ExercisesModal article={article} />*/}
			</div>
		</div>
	)
}

export default ArticleArticleContent
