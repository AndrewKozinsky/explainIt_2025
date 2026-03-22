import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from 'сonsts/pageUrls'

function VideoBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.videos]} />
}

export default VideoBreadCrumbs
