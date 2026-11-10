import type { TranslationBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import ExampleBlock from '../ExampleBlock/ExampleBlock'
import ListBlock from '../ListBlock/ListBlock'
import SectionBlock from '../SectionBlock/SectionBlock'
import SenseBlock from '../SenseBlock/SenseBlock'
import TextBlock from '../TextBlock/TextBlock'
import WordsBlock from '../WordsBlock/WordsBlock'

/** Отрисовывает блоки статьи. Секции и значения вкладывают в себя такое же дерево. */
function ArticleBlockTree({ blocks }: { blocks: TranslationBlockModel[] }) {
	return (
		<>
			{blocks.map((block, blockIndex) => (
				<ArticleBlock key={blockIndex} block={block} />
			))}
		</>
	)
}

function ArticleBlock({ block }: { block: TranslationBlockModel }) {
	if (block.type === 'block') return <SectionBlock block={block} />
	if (block.type === 'sense') return <SenseBlock block={block} />
	if (block.type === 'example') return <ExampleBlock block={block} />
	if (block.type === 'text') return <TextBlock block={block} />
	if (block.type === 'words') return <WordsBlock block={block} />
	if (block.type === 'list') return <ListBlock block={block} />

	// Неизвестный тип блока от сервера более новой версии просто пропускается
	return null
}

export default ArticleBlockTree
