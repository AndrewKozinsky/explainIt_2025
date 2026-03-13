import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useVideoBreadCrumbsItems } from './fn/useVideoBreadCrumbsItems'

function WatchingBreadCrumbs() {
	return <BreadCrumbs items={useVideoBreadCrumbsItems()} />
}

export default WatchingBreadCrumbs
