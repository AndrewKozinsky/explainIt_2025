import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { fetchDictionaryArticle } from '@/widgets/dictionary/lib/fetchDictionaryArticle'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
import './WordsQuickAccess.scss'

type WordsQuickAccessProps = {
	words: string[]
}

function WordsQuickAccess(props: WordsQuickAccessProps) {
	const { words } = props

	if (words.length === 0) {
		return null
	}

	function handleClick(word: string) {
		usePhraseDictionaryStore.getState().setInputText(word)
		fetchDictionaryArticle(word)
	}

	return (
		<div className='words-quick-access'>
			{words.map((word, index) => (
				<Button key={`${word}-${index}`} size='small' theme='outline' onClick={() => handleClick(word)}>
					{word}
				</Button>
			))}
		</div>
	)
}

export default WordsQuickAccess
