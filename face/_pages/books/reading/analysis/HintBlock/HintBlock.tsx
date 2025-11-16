import { PressEnterForTranslation } from './PressEnterForTranslation'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { HoldToSelectRelatedWords } from './HoldToSelectRelatedWords'
import TranslateButton from './TranslateButton'
import LongTapForSelectSeveralWords from '_pages/books/reading/analysis/HintBlock/LongTapForSelectSeveralWords'
import './HintBlock.scss'

function HintBlock() {
	const deviceType = useReadingStore((s) => s.deviceType)

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
