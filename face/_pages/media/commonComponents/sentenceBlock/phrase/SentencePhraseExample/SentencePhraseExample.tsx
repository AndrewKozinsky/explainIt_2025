import { PhraseExample } from '_pages/media/detailsBlock/detailsStore'
import './SentencePhraseExample.scss'

function SentencePhraseExample({ example }: { example: PhraseExample }) {
	return (
		<div className='sentence-phrase-example'>
			<p className='sentence-phrase-example__text'>{example.text}</p>
			<p className='sentence-phrase-example__translate'>{example.translate}</p>
		</div>
	)
}

export default SentencePhraseExample
