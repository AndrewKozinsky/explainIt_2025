import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { pageUrls } from '@/shared/utils/pageUrls'
import './DocsPage.scss'

function DocsPage() {
	const t = useTranslations('pageUrls')
	const pagesConfig = [pageUrls.docs.privacyPolicy, pageUrls.docs.offer, pageUrls.docs.contentUsePolicy]

	return (
		<div className='docs-page'>
			{pagesConfig.map((pageConfig) => {
				return (
					<Link className='link' href={pageConfig.path} key={pageConfig.path}>
						{t(pageConfig.nameKey)}
					</Link>
				)
			})}
		</div>
	)
}

export default DocsPage
