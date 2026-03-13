import React from 'react'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useReadingBreadCrumbsItems } from '_pages/media/reading/root/ReadingBreadCrumbs/fn/useReadingBreadCrumbsItems'

function ReadingBreadCrumbs() {
	return <BreadCrumbs items={useReadingBreadCrumbsItems()} />
}

export default ReadingBreadCrumbs
