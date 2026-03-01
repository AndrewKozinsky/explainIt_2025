import Tabs, { TabConfig } from 'ui/Tabs/Tabs'
import './MobileNavigation.scss'

type MobileNavigationProps = {
	currentTabId: string
	tabsConfig: TabConfig[]
}

function MobileNavigation(props: MobileNavigationProps) {
	const { currentTabId, tabsConfig } = props

	return (
		<div className='mobile-navigation'>
			<Tabs currentTabId={currentTabId} tabsConfig={tabsConfig} />
		</div>
	)
}

export default MobileNavigation
