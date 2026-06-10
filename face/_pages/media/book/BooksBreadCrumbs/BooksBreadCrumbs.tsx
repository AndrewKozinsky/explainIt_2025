import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from 'utils/pageUrls'

function BooksBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.books]} />
}

export default BooksBreadCrumbs
