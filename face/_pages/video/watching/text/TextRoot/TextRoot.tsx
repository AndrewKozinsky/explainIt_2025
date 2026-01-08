import React from 'react'
import MobileNavigation from '_pages/video/watching/text/MobileNavigation/MobileNavigation'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { getSectionClasses } from './fn/getSectionClasses'
import TextSide from '../textSide/TextSide/TextSide'
import { useUpdateRootSelectedText } from './fn/useUpdateRootSelectedText'
import './TextRoot.scss'
import DetailsSide from '../detailsSide/DetailsSide/DetailsSide'

function TextRoot() {
	const currentMobileContentType = useWatchingStore((s) => s.mobileCurrentContentType)
	useUpdateRootSelectedText()

	return (
		<div className='watching-text-root'>
			<MobileNavigation />
			<div className='watching-text-root__blocks'>
				<div className={getSectionClasses('text', currentMobileContentType)}>
					<TextSide />
				</div>
				<div className={getSectionClasses('details', currentMobileContentType)}>
					<DetailsSide />
				</div>
			</div>
		</div>
	)
}

export default TextRoot
