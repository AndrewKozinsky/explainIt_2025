import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import ArticleType from '../../../../articles/articleTypes/articleType'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '../../../../ui/pageRelated/PageContentWrapper/PageContentWrapper'
import ArticleArticleContent from '../ArticleArticleContent/ArticleArticleContent'
import { pageUrls } from '../../../../сonsts/pageUrls'

import CourseArticlePageHeader from '../CourceArticlePageHeader/CourceArticlePageHeader'

type CourseLevelPageProps = {
	// Предыдущая статья относительно текущей
	prevArticle: ArticleType.Art | null
	// Текущая статья
	article: ArticleType.Art
	// Следующая статья относительно текущей
	nextArticle: ArticleType.Art | null
}

/** Страница главы курса */
function CourseArticlePage(props: CourseLevelPageProps) {
	const { prevArticle, article, nextArticle } = props

	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs items={[pageUrls.course]} />
				<CourseArticlePageHeader article={article} />
				<ArticleArticleContent prevArticle={prevArticle} article={article} nextArticle={nextArticle} />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default CourseArticlePage
