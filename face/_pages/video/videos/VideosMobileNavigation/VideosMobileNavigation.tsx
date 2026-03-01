import MobileNavigation from '_pages/bookAndVideoCommon/MobileNavigation/MobileNavigation'
import { useVideosStore } from '../videosStore'
import { tabsConfig } from './fn/tabsConfig'

function VideosMobileNavigation() {
	const mobileCurrentContentType = useVideosStore((s) => s.mobileCurrentContentType)

	return <MobileNavigation currentTabId={mobileCurrentContentType} tabsConfig={tabsConfig} />
}

export default VideosMobileNavigation
