import type { WordsBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import ContentCardGrid from '@/shared/ui/content/ContentCardGrid/ContentCardGrid'
import { fetchDictionaryArticle } from '../../../lib/fetchDictionaryArticle'
import './WordsBlock.scss'

/** Похожие слова: карточка текущего слова и карточки, открывающие статьи о похожих словах. */
function WordsBlock({ block: { currentWord, similarWords } }: { block: WordsBlockModel }) {
	const words = currentWord ? [currentWord, ...similarWords] : similarWords

	const items = words.map((wordCard, index) => ({
		id: `${wordCard.word}-${index}`,
		title: wordCard.word,
		description: wordCard.description,
		onClick: wordCard === currentWord ? undefined : () => fetchDictionaryArticle(wordCard.word),
	}))

	return (
		<div className='translation-words'>
			<ContentCardGrid items={items} />
		</div>
	)
}

export default WordsBlock
