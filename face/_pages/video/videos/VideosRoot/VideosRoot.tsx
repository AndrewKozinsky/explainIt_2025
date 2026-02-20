import VideosMobileNavigation from '_pages/video/videos/VideosMobileNavigation/VideosMobileNavigation'
import { useVideosStore } from '_pages/video/videos/videosStore'
import DetailsSection from '../detailsSection/DetailsSection/DetailsSection'
import VideosSection from '../videosListSection/VideosSection/VideosSection'
import { getSectionClasses } from './fn/getSectionClasses'
import { usePopulateVideosStore } from './fn/populateVideosStore'
import './VideosRoot.scss'

function VideosRoot() {
	usePopulateVideosStore()

	const currentMobileContentType = useVideosStore((s) => s.mobileCurrentContentType)

	return (
		<main className='videos-page-content'>
			<VideosMobileNavigation />
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
