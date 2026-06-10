import { PhraseExample } from '_pages/media/detailsBlock/detailsStore'
import './SentencePhraseExample.scss'

function SentencePhraseExample({ example }: { example: PhraseExample }) {
	return <p className='sentence-phrase-example'>{example.text && `${example.text} — ${example.translate}`}</p>
}

export default SentencePhraseExample
