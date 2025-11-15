import { PressEnterForTranslation } from './PressEnterForTranslation'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { HoldToSelectRelatedWords } from './HoldToSelectRelatedWords'
import TranslateButton from './TranslateButton'
import LongTapForSelectSeveralWords from '_pages/books/readingNext/analysis/HintBlock/LongTapForSelectSeveralWords'
import './HintBlock.scss'

function HintBlock() {
	const deviceType = useReadingStoreNext((s) => s.deviceType)

	return deviceType === 'mouse' ? <HintBlockMouse /> : <HintBlockMobile />
}

export default HintBlock

function HintBlockMouse() {
	return (
		<div className='hint-block hint-block--for-mouse'>
			<PressEnterForTranslation />
			<HoldToSelectRelatedWords />
		</div>
	)
}
function HintBlockMobile() {
	return (
		<div className='hint-block hint-block--for-touch'>
			<LongTapForSelectSeveralWords />
			<TranslateButton />
		</div>
	)
}
