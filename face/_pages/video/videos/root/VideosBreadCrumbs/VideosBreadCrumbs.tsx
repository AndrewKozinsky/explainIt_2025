import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from 'сonsts/pageUrls'

function VideosBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.videos]} />
}

export default VideosBreadCrumbs
