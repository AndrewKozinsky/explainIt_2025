import React from 'react'
import ArticleType from '../../../../articles/articleTypes/articleType'
import { PageHeader } from '../../../../ui/pageRelated/PageHeader/PageHeader'
import './CourseArticlePageHeader.scss'

type ChapterNumberProps = {
	article: ArticleType.Art
}

function CourseArticlePageHeader(props: ChapterNumberProps) {
	const { name, number: chapterNum } = props.article.meta

	const headerBits = name.split(' ').map((textBit, i) => {
		return (
			<React.Fragment key={i}>
				<span>{textBit}</span>{' '}
			</React.Fragment>
		)
	})

	return (
		<PageHeader extraClass='course-article-page-header'>
			{headerBits}
			<span className='course-article-page-header__num'>
				<span className='course-article-page-header__num-text'>{chapterNum}</span>
			</span>
		</PageHeader>
	)
}

export default CourseArticlePageHeader
