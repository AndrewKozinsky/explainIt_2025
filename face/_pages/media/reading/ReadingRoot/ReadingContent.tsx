import DetailsBlock from '_pages/media/detailsBlock/DetailsBlock/DetailsBlock'
import ChapterContent from '../ChapterContent/ChapterContent'
import ReadingNavigation from '../ReadingNavigation/ReadingNavigation'

function ReadingContent() {
	return (
		<>
			<div className='reading-root__content'>
				<ChapterContent />
				<div className='reading-root__analysis'>
					<DetailsBlock mediaType='reading' />
				</div>
			</div>
			<ReadingNavigation />
		</>
	)
}

export default ReadingContent
