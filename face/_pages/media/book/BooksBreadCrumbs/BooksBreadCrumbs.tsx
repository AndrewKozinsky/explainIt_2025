import { pageUrls } from 'utils/pageUrls'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'

function BooksBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.books]} />
}

export default BooksBreadCrumbs
