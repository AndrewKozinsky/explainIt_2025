import React from 'react'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useVideoBreadCrumbsItems } from '_pages/video/watching/root/VideoBreadCrumbs/fn/useVideoBreadCrumbsItems'

function VideoBreadCrumbs() {
	return <BreadCrumbs items={useVideoBreadCrumbsItems()} />
}

export default VideoBreadCrumbs
