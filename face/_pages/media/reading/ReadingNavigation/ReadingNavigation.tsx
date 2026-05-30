import { BookLink, PrevChapterLink, NextChapterLink } from './Buttons'
import '_pages/media/reading/ReadingNavigation/ReadingNavigation.scss'

function ReadingNavigation() {
	return (
		<div className='reading-navigation'>
			<div className='reading-navigation__auto-height' />
			<div className='reading-navigation__inner'>
				<BookLink />
				{/*<span />*/}
				<PrevChapterLink />
				<NextChapterLink />
			</div>
		</div>
	)
}

export default ReadingNavigation
