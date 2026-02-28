import React from 'react'
import Header from 'ui/Header/Header'
import BooksHeader from '_pages/books/books/root/BooksHeader/BooksHeader'
import VideosMobileNavigation from '_pages/video/videos/VideosMobileNavigation/VideosMobileNavigation'
import { useVideosStore } from '_pages/video/videos/videosStore'
import DetailsSection from '../../detailsSection/DetailsSection/DetailsSection'
import VideosSection from '../../videosListSection/VideosSection/VideosSection'
import VideosBreadCrumbs from '../VideosBreadCrumbs/VideosBreadCrumbs'
import VideosHeader from '../VideosHeader/VideosHeader'
import { getSectionClasses } from './fn/getSectionClasses'
import { usePopulateVideosStore } from './fn/populateVideosStore'
import './VideosRoot.scss'

function VideosRoot() {
	usePopulateVideosStore()

	const currentMobileContentType = useVideosStore((s) => s.mobileCurrentContentType)

	return (
		<div className='videos-root'>
			<div className='videos-root__top'>
				<VideosBreadCrumbs />
				<VideosHeader />
			</div>
			<div className='videos-root__content'>
				<VideosMobileNavigation />
				<div className='videos-root__content-blocks'>
					<div className={getSectionClasses('videos', currentMobileContentType)}>
						<VideosSection />
					</div>
					<div className={getSectionClasses('video', currentMobileContentType)}>
						<DetailsSection />
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideosRoot
