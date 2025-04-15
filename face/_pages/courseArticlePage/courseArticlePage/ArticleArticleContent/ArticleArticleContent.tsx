import React from 'react'
import ArticleBuilder from '../../../../articles/ArticleBuilder/ArticleBuilder'
// import ExercisesStoreWrapper from '../../ExercisesStoreWrapper/ExercisesStoreWrapper'
// import LearnByHeartButton from '../../../../articleBuilder/components/learnByHeart/LearnByHeartButton/LearnByHeartButton'
// import { ExercisesModal } from '../../../../articleBuilder/exercisesModal'
// import { PageUrls } from '../../../../сonsts/pageUrls'
import { PrevAndNextArticlesNav } from '../../common/ArtPrevAndNextButtons/PrevAndNextArticlesNav'
import ArticleType from '../../../../articles/articleTypes/articleType'
import './ArticleArticleContent.scss'

type ArticleContentProps = {
	prevArticle: ArticleType.Art | null
	article: ArticleType.Art
	nextArticle: ArticleType.Art | null
}

/** Содержимое страницы начала уровня языка в курсе */
function ArticleArticleContent(props: ArticleContentProps) {
	const { prevArticle, article, nextArticle } = props

	return (
		<div className='article-article'>
			{/*<ExercisesStoreWrapper articleContent={article.content} />*/}
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
