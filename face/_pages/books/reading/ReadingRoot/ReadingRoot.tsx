'use client'

import Chapter from '../chapter/Chapter/Chapter'
import { usePopulateReadingStore } from './fn/getContentStructure'
import Analysis from '../analysis/Analysis/Analysis'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()

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
