import React from 'react'
import ArticleType from '../../../../articles/articleTypes/articleType'
import './CourseArticlePageHeader.scss'
import { Header } from '../../../../ui/Header/Header'

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
		<Header extraClass='course-article-page-header'>
			{headerBits}
			<span className='course-article-page-header__num'>
				<span className='course-article-page-header__num-text'>{chapterNum}</span>
			</span>
		</Header>
	)
}

export default CourseArticlePageHeader
