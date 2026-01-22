import React from 'react'
import { useBooksStore } from '_pages/books/books/booksStore'
import Tabs from 'ui/Tabs/Tabs'
import { tabsConfig } from './fn/onButtonClick'
import './MobileNavigation.scss'

function MobileNavigation() {
	const mobileCurrentContentType = useBooksStore((s) => s.mobileCurrentContentType)

	return (
		<div className='mobile-navigation'>
			<Tabs currentTabId={mobileCurrentContentType} tabsConfig={tabsConfig} />
		</div>
	)
}

export default MobileNavigation
