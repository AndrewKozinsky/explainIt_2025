import React from 'react'
import ExpressionsList from '../ExpressionsList/ExpressionsList'
import './ExpressionsPageContent.scss'

export default function ExpressionsPageContent({ children }: { children: React.ReactNode }) {
	return (
		<div className='expressions-page-content'>
			<div className='expressions-page-content__left'>
				<ExpressionsList />
			</div>
			<div className='expressions-page-content__right'>{children}</div>
		</div>
	)
}
