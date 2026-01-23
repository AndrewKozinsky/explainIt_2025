import Tabs from 'ui/Tabs/Tabs'
import { useVideosStore } from '../videosStore'
import { tabsConfig } from './fn/onButtonClick'
import './MobileNavigation.scss'

function MobileNavigation() {
	const mobileCurrentContentType = useVideosStore((s) => s.mobileCurrentContentType)

	return (
		<div className='mobile-navigation'>
			<Tabs currentTabId={mobileCurrentContentType} tabsConfig={tabsConfig} />
		</div>
	)
}

export default MobileNavigation
