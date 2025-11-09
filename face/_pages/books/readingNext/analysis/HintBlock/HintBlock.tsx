import { PressEnterForTranslation } from './PressEnterForTranslation'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { HoldToSelectRelatedWords } from './HoldToSelectRelatedWords'
import './HintBlock.scss'

function HintBlock() {
	const deviceType = useReadingStoreNext((s) => s.deviceType)

	return <div className='hint-block'>{deviceType === 'mouse' ? <HintBlockMouse /> : <HintBlockMobile />}</div>
}

export default HintBlock

function HintBlockMouse() {
	return (
		<>
			<PressEnterForTranslation />
			<HoldToSelectRelatedWords />
		</>
	)
}
function HintBlockMobile() {
	return null
}
