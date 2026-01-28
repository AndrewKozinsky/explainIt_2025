import CopyButton from './CopyButton'
import TranslateButton from './TranslateButton'
import './SentenceButtons.scss'

function SentenceButtons() {
	return (
		<div className='sentence-buttons'>
			<CopyButton />
			<TranslateButton />
		</div>
	)
}

export default SentenceButtons
