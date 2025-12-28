import React from 'react'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'
import VideoRoot from '../VideoRoot/VideoRoot'
import './VideoPage.scss'

function VideoPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Видео</Header>
				<div className='video-page__content'>
					<VideoRoot />
				</div>
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default VideoPage
