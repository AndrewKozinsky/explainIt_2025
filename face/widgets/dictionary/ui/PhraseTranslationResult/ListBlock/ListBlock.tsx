import type { ListBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import './ListBlock.scss'

/** Список выражений с переводом. */
function ListBlock({ block }: { block: ListBlockModel }) {
	return (
		<ul className='translation-list'>
			{block.items.map((listItem) => (
				<li key={listItem.term} className='translation-list__item'>
					<span className='translation-list__term'>{listItem.term}</span>
					<span className='translation-list__translation'> — {listItem.translation}</span>
				</li>
			))}
		</ul>
	)
}

export default ListBlock
