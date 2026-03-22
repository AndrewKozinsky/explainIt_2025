import DetailsBlock from '_pages/media/commonComponents/detailsBlock/DetailsBlock/DetailsBlock'
// import MobileNavigation from '../MobileNavigation/MobileNavigation'
import { useWatchingStore } from '../../watchingStore'
import TextSide from '../textSide/TextSide/TextSide'
import { getSectionClasses } from './fn/getSectionClasses'
import './TextRoot.scss'

function TextRoot() {
	const currentMobileContentType = useWatchingStore((s) => s.mobileCurrentContentType)

	return (
		<div className='watching-text-root'>
			{/*<MobileNavigation />*/}
			<div className='watching-text-root__blocks'>
				<div className={getSectionClasses('text', currentMobileContentType)}>
					<TextSide />
				</div>
				<div className={getSectionClasses('details', currentMobileContentType)}>
					<DetailsBlock mediaType='watching' />
				</div>
			</div>
		</div>
	)
}

export default TextRoot
