import { useWatchingStore } from '_pages/video/watching/watchingStore'
import React from 'react'
import Tabs from 'ui/Tabs/Tabs'
import { tabsConfig } from './fn/onButtonClick'
import './MobileNavigation.scss'

function MobileNavigation() {
	const mobileCurrentContentType = useWatchingStore((s) => s.mobileCurrentContentType)

	return (
		<div className='mobile-navigation'>
			<Tabs currentTabId={mobileCurrentContentType} tabsConfig={tabsConfig} />
		</div>
	)
}

export default MobileNavigation
