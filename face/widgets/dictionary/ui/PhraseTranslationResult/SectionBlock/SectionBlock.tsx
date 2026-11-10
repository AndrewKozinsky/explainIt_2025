import type { BlockBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import ArticleBlockTree from '../ArticleBlockTree/ArticleBlockTree'
import './SectionBlock.scss'

/** Секция статьи с заголовком и вложенными блоками. */
function SectionBlock({ block }: { block: BlockBlockModel }) {
	return (
		<section className='translation-block'>
			<h3 className='translation-block__header'>{block.header}</h3>
			<ArticleBlockTree blocks={block.children} />
		</section>
	)
}

export default SectionBlock
