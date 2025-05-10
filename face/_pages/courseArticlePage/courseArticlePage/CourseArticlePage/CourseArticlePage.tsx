import React from 'react'
import ArticleType from '../../../../articles/articleTypes/articleType'
import { BreadCrumbs } from '../../../../ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '../../../../ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import ArticleArticleContent from '../ArticleArticleContent/ArticleArticleContent'
import { PageUrls } from '../../../../сonsts/pageUrls'

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
		<PageWrapper>
			<PageContentWrapper>
				<BreadCrumbs items={[PageUrls.course]} />
				<CourseArticlePageHeader article={article} />
				<ArticleArticleContent prevArticle={prevArticle} article={article} nextArticle={nextArticle} />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default CourseArticlePage
