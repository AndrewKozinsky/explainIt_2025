import type { TextBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import './TextBlock.scss'

/** Текст статьи в формате Markdown. */
function TextBlock({ block }: { block: TextBlockModel }) {
	return <StyledMarkdown content={block.text} className='translation-text' />
}

export default TextBlock
