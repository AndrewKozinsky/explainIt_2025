import PrivateVideosListSection from '../PrivateVideosSection/PrivateVideosListSection'
import PublicVideosList from '../PublicVideosList/PublicVideosList'
import './VideosSection.scss'

function VideosSection() {
	return (
		<div className='videos-section'>
			<PublicVideosList />
			<PrivateVideosListSection />
		</div>
	)
}

export default VideosSection
