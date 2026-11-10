import ClickableText from '@/shared/ui/ClickableText/ClickableText'
import { useSentenceWordSelection } from './fn/useSentenceWordSelection'

type SentenceProps = {
	sentenceId: number
	sentenceText: string
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	/** Сколько слов предложения стоит до этого текста: в субтитрах предложение бывает разбито на части. */
	wordIdOffset?: number
}

/** Предложение книги или часть предложения в субтитре со словами-кнопками (ClickableText). */
function Sentence(props: SentenceProps) {
	const { sentenceId, sentenceText, selectedSentenceId, selectedWordId, selectWord, wordIdOffset = 0 } = props

	const { segments, selectedStarts, getHighlightedStarts, handleWordClick } = useSentenceWordSelection({
		sentenceId,
		sentenceText,
		selectedSentenceId,
		selectedWordId,
		selectWord,
		wordIdOffset,
	})

	return (
		<p>
			<ClickableText
				segments={segments}
				getHighlightedStarts={getHighlightedStarts}
				selectedStarts={selectedStarts}
				onWordClick={handleWordClick}
			/>
		</p>
	)
}

export default Sentence
