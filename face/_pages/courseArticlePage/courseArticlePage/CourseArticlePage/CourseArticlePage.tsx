import React from 'react'
import ArticleType from '../../../../articles/articleTypes/articleType'
import { BreadCrumbs } from '../../../../ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '../../../../ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import { PageHeader } from '../../../../ui/pageRelated/PageHeader/PageHeader'
import { extractNumFromStr } from '../../../../utils/number'
import ArticleArticleContent from '../ArticleArticleContent/ArticleArticleContent'
import { PageUrls } from '../../../../сonsts/pageUrls'
import './CourseArticlePage.scss'

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
				<Header article={article} />
				<ArticleArticleContent prevArticle={prevArticle} article={article} nextArticle={nextArticle} />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default CourseArticlePage

type ChapterNumberProps = {
	article: ArticleType.Art
}

function Header(props: ChapterNumberProps) {
	const { articleName, number: chapterNum } = props.article.meta

	return (
		<PageHeader extraClass='course-article-page'>
			{articleName}
			<span className='course-article-page__header-num'>
				<span className='course-article-page__header-num-text'>{chapterNum}</span>
			</span>
		</PageHeader>
	)
}
