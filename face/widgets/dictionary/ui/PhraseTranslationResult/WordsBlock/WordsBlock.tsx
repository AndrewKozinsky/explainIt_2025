import type { WordsBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import { fetchDictionaryArticle } from '../../../lib/fetchDictionaryArticle'
import WordCard from '../WordCard/WordCard'
import './WordsBlock.scss'

/** Похожие слова: карточка текущего слова и карточки, открывающие статьи о похожих словах. */
function WordsBlock({ block }: { block: WordsBlockModel }) {
	return (
		<div className='translation-words'>
			{block.currentWord && (
				<div className='translation-words__card translation-words__card--current'>
					<WordCard wordCard={block.currentWord} />
				</div>
			)}
			{block.similarWords.map((wordCard) => (
				<button
					key={wordCard.word}
					type='button'
					className='translation-words__card'
					onClick={() => fetchDictionaryArticle(wordCard.word)}
				>
					<WordCard wordCard={wordCard} />
				</button>
			))}
		</div>
	)
}

export default WordsBlock
