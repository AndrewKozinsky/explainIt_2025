import React from 'react'
import Chapter from '../chapter/Chapter/Chapter'
import Analysis from '../analysis/Analysis/Analysis'
import './ReadingRoot.scss'

function ReadingRoot() {
	return (
		<div className='reading-root'>
			<div className='reading-root__chapter'>
				<Chapter />
			</div>
			<div className='reading-root__analysis'>
				<Analysis />
			</div>
		</div>
	)
}

export default ReadingRoot
