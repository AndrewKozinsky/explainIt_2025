import React from 'react'
import ArticleType from '../../../../articles/articlesData/articleType'
import { BreadCrumbs } from '../../../../ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '../../../../ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import { PageHeader } from '../../../../ui/pageRelated/PageHeader/PageHeader'
import { extractNumFromStr } from '../../../../utils/number'
import ArticleArticleContent from '../ArticleArticleContent/ArticleArticleContent'
import { PageUrls } from '../../../../сonsts/pageUrls'
import s from './CourseArticlePage.module.scss'

type CourseLevelPageProps = {
	// Предыдущая статья относительно текущей
	prevArticle: ArticleType.Art | null
	// Текущая статья
	article: ArticleType.Art
	// Следующая статья относительно текущей
	nextArticle: ArticleType.Art | null
}

/** Страница главы в курса */
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
	const { caption, articleName } = props.article.meta
	const chapterNum = extractNumFromStr(caption)

	return (
		<PageHeader extraClass={s.generalWrapper}>
			{articleName}
			<span className={s.circle}>
				<span className={s.circleNum}>{chapterNum}</span>
			</span>
		</PageHeader>
	)
}
