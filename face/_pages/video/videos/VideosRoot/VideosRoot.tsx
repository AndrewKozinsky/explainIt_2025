import { getSectionClasses } from './fn/getSectionClasses'
import { usePopulateVideosStore } from '_pages/video/videos/VideosRoot/fn/populateVideosStore'
import { useVideosStore } from '_pages/video/videos/videosStore'
import MobileNavigation from '../MobileNavigation/MobileNavigation'
import VideosSection from '../videosListSection/VideosSection/VideosSection'
import DetailsSection from '../detailsSection/DetailsSection/DetailsSection'
import './VideosRoot.scss'

function VideosRoot() {
	usePopulateVideosStore()

	const currentMobileContentType = useVideosStore((s) => s.mobileCurrentContentType)

	return (
		<main className='videos-page-content'>
			<MobileNavigation />
			<div className='videos-page-content__blocks'>
				<div className={getSectionClasses('videos', currentMobileContentType)}>
					<VideosSection />
				</div>
				<div className={getSectionClasses('video', currentMobileContentType)}>
					<DetailsSection />
				</div>
			</div>
		</main>
	)
}

export default VideosRoot
