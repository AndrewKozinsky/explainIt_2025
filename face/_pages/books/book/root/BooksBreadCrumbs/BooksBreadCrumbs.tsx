import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from 'сonsts/pageUrls'

function BooksBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.books]} />
}

export default BooksBreadCrumbs
