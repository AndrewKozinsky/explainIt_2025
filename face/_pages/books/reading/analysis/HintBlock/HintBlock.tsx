import { useSystemStore } from 'stores/systemStore'
import LongTapForSelectSeveralWords from '_pages/books/reading/analysis/HintBlock/LongTapForSelectSeveralWords'
import { HoldToSelectRelatedWords } from './HoldToSelectRelatedWords'
import TranslateButton from './TranslateButton'
import './HintBlock.scss'

function HintBlock() {
	const deviceType = useSystemStore((s) => s.deviceType)

	return deviceType === 'desktop' ? <HintBlockMouse /> : <HintBlockMobile />
}

export default HintBlock

function HintBlockMouse() {
	return (
		<div className='hint-block hint-block--for-mouse'>
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
