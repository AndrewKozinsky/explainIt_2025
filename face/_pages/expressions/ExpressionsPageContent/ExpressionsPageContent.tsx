import React from 'react'
import ArticleList from '@/_pages/expressions/ArticleList/ArticleList'
import './ExpressionsPageContent.scss'

export default function ExpressionsPageContent({ children }: { children: React.ReactNode }) {
	return (
		<div className='expressions-page-content'>
			<div className='expressions-page-content__left'>
				<ArticleList />
			</div>
			<div className='expressions-page-content__right'>{children}</div>
		</div>
	)
}
