import React from 'react'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useVideosBreadCrumbsItems } from '_pages/video/videos/VideosBreadCrumbs/fn/useVideosBreadCrumbsItems'

function VideosBreadCrumbs() {
	return <BreadCrumbs items={useVideosBreadCrumbsItems()} />
}

export default VideosBreadCrumbs
