import Header from 'ui/Header/Header'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import DictionaryItems from '../DictionaryItems/DictionaryItems'

/** Страница словаря */
function DictionaryPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Словарь</Header>
				<DictionaryItems />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default DictionaryPage
