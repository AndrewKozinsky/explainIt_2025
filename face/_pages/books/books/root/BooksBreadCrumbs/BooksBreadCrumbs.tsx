import React from 'react'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useBooksBreadCrumbsItems } from './fn/useBooksBreadCrumbsItems'

function BooksBreadCrumbs() {
	return <BreadCrumbs items={useBooksBreadCrumbsItems()} />
}

export default BooksBreadCrumbs
