import { pageUrls } from 'utils/pageUrls'
import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import DictionaryPageContent from '_pages/dictionary/DictionaryPageContent/DictionaryPageContent'

/** Страница словаря */
function DictionaryPage() {
	return (
		<PageWrapper withTop withBottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{pageUrls.dictionary.name}</Header>
				<DictionaryPageContent />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default DictionaryPage
