import React from 'react'
import Link from 'next/link'
import { pageUrls } from 'сonsts/pageUrls'
import './DocsPage.scss'
import './DocsPage.scss'

function DocsPage() {
	const pagesConfig = [pageUrls.docs.privacyPolicy, pageUrls.docs.offer, pageUrls.docs.contentUsePolicy]
	return (
		<div className='docs-page'>
			{pagesConfig.map((pageConfig) => {
				return (
					<Link className='link' href={pageConfig.path} key={pageConfig.path}>
						{pageConfig.name}
					</Link>
				)
			})}
		</div>
	)
}

export default DocsPage
