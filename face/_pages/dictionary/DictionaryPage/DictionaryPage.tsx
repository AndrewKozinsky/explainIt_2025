import Header from 'ui/Header/Header'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { pageUrls } from 'utils/pageUrls'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import DictionaryPageContent from '_pages/dictionary/DictionaryPageContent/DictionaryPageContent'

/** Страница словаря */
function DictionaryPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{pageUrls.dictionary.name}</Header>
				<DictionaryPageContent />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default DictionaryPage
