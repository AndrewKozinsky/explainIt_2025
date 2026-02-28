import React from 'react'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useChapterBreadCrumbsItems } from '_pages/books/reading/root/ChapterBreadCrumbs/fn/useChapterBreadCrumbsItems'

function ChapterBreadCrumbs() {
	return <BreadCrumbs items={useChapterBreadCrumbsItems()} />
}

export default ChapterBreadCrumbs
