import type { WordCardModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import './WordCard.scss'

/** Содержимое карточки слова: слово и короткое описание. */
function WordCard({ wordCard }: { wordCard: WordCardModel }) {
	return (
		<>
			<span className='word-card__word'>{wordCard.word}</span>
			<span className='word-card__description'>{wordCard.description}</span>
		</>
	)
}

export default WordCard
