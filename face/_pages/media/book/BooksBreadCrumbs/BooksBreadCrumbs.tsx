import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'

function BooksBreadCrumbs() {
	return <BreadCrumbs items={[pageUrls.books]} />
}

export default BooksBreadCrumbs
