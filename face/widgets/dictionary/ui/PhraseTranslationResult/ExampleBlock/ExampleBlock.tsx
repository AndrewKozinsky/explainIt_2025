import type { ExampleBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import './ExampleBlock.scss'

/** Пример с переводом. Жирным модель отмечает изучаемое слово и его перевод. */
function ExampleBlock({ block }: { block: ExampleBlockModel }) {
	return (
		<div className='translation-example'>
			<StyledMarkdown content={block.sentence} className='translation-example__sentence' />
			<StyledMarkdown content={block.translation} className='translation-example__translation' />
		</div>
	)
}

export default ExampleBlock
