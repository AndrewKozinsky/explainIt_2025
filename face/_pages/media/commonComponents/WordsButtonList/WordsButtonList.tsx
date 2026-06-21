import Button from '@/ui/formRelated/buttons/Button/Button'
import { useCurrentWords } from './fn/currentWords'
import './WordsButtonList.scss'

type WordsButtonListProps = {
	onWordClick: (word: string) => void
	onPhraseClick: (phrase: string) => void
}

function WordsButtonList(props: WordsButtonListProps) {
	const { onWordClick, onPhraseClick } = props
	const { sentenceWords, phrase } = useCurrentWords()

	if (sentenceWords.length === 0) {
		return null
	}

	return (
		<div className='words-button-list'>
			{sentenceWords.map((word, index) => (
				<Button key={`w-${index}`} onClick={() => onWordClick(word)} size='small' theme='outline'>
					{word}
				</Button>
			))}
			{phrase && (
				<Button onClick={() => onPhraseClick(phrase)} size='small' theme='outline'>
					{phrase}
				</Button>
			)}
		</div>
	)
}

export default WordsButtonList
