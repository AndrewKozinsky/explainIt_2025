import type {
	TranslationBlockModel,
	BlockBlockModel,
	UseCaseBlockModel,
	PaperBlockModel,
	ExampleBlockModel,
	PhrasesButtonsBlockModel,
	TextBlockModel,
} from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
import './PhraseTranslationResult.scss'

// ─── Component Registry ──────────────────────────────────────────────────────

type BlockComponent<P extends TranslationBlockModel = TranslationBlockModel> = React.ComponentType<{
	block: P
	index: number
}>

const blockComponents: Record<TranslationBlockModel['type'], BlockComponent<any>> = {
	block: BlockRenderer,
	useCase: UseCaseRenderer,
	paper: PaperRenderer,
	example: ExampleRenderer,
	phrasesButtons: PhrasesButtonsRenderer,
	text: TextRenderer,
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

function BlockTree({ blocks }: { blocks: TranslationBlockModel[] }) {
	return (
		<>
			{blocks.map((block, i) => {
				const Component = blockComponents[block.type]
				if (!Component) return null
				return <Component key={i} block={block} index={i} />
			})}
		</>
	)
}

// ─── PhraseTranslationResult ─────────────────────────────────────────────────

let useCaseCounter = 0

function PhraseTranslationResult() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const translation = usePhraseDictionaryStore((s) => s.translation)

	if (status !== 'ready' || !translation || !Array.isArray(translation) || translation.length === 0) return null

	useCaseCounter = 0

	return (
		<div className='phrase-translation-result'>
			<BlockTree blocks={translation} />
		</div>
	)
}

// ─── Block Renderers ─────────────────────────────────────────────────────────

function BlockRenderer({ block }: { block: BlockBlockModel }) {
	return (
		<section className='translation-block'>
			<h3 className='translation-block__header'>{block.header}</h3>
			<BlockTree blocks={block.children} />
		</section>
	)
}

function UseCaseRenderer({ block }: { block: UseCaseBlockModel }) {
	useCaseCounter++
	const number = useCaseCounter

	return (
		<div className='translation-use-case'>
			<h4 className='translation-use-case__header'>
				<span className='translation-use-case__number'>{number}</span>
				{block.header}
			</h4>
			<BlockTree blocks={block.children} />
		</div>
	)
}

function PaperRenderer({ block }: { block: PaperBlockModel }) {
	return (
		<div className='translation-paper'>
			<BlockTree blocks={block.children} />
		</div>
	)
}

function ExampleRenderer({ block }: { block: ExampleBlockModel }) {
	return (
		<div className='translation-example'>
			<p className='translation-example__sentence'>{block.sentence}</p>
			<p className='translation-example__translation'>{block.translation}</p>
		</div>
	)
}

function PhrasesButtonsRenderer({ block }: { block: PhrasesButtonsBlockModel }) {
	const setInputText = usePhraseDictionaryStore((s) => s.setInputText)

	return (
		<div className='translation-phrases-buttons'>
			{block.labels.map((label) => (
				<button key={label} className='translation-phrases-button' onClick={() => setInputText(label)}>
					{label}
				</button>
			))}
		</div>
	)
}

function TextRenderer({ block }: { block: TextBlockModel }) {
	return <StyledMarkdown content={block.text} />
}

export default PhraseTranslationResult
