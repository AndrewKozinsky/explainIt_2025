import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from 'utils/pageUrls'

function VideoBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.videos]} />
}

export default VideoBreadCrumbs
