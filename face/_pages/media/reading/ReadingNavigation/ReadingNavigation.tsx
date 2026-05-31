import { BookLink, PrevChapterLink, NextChapterLink } from './Buttons'
import './ReadingNavigation.scss'

function ReadingNavigation() {
	return (
		<div className='reading-navigation'>
			<div className='reading-navigation__auto-height' />
			<div className='reading-navigation__inner'>
				<BookLink />
				<PrevChapterLink />
				<NextChapterLink />
			</div>
		</div>
	)
}

export default ReadingNavigation
