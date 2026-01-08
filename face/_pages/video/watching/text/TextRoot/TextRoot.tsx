import React from 'react'
import MobileNavigation from '_pages/video/watching/text/MobileNavigation/MobileNavigation'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { getSectionClasses } from './fn/getSectionClasses'
import TextSide from '../textSide/TextSide/TextSide'
import './TextRoot.scss'

function TextRoot() {
	const currentMobileContentType = useWatchingStore((s) => s.mobileCurrentContentType)

	return (
		<div className='watching-text-root'>
			<MobileNavigation />
			<div className='watching-text-root__blocks'>
				<div className={getSectionClasses('text', currentMobileContentType)}>
					<TextSide />
				</div>
				<div className={getSectionClasses('details', currentMobileContentType)}>
					<p>Details Section</p>
				</div>
			</div>
		</div>
	)
}

export default TextRoot
