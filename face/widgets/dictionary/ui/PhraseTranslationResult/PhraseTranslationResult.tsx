import { type ComponentType, createContext, useContext } from 'react'
import type {
	BlockBlockModel,
	ExampleBlockModel,
	ListBlockModel,
	SenseBlockModel,
	TextBlockModel,
	TranslationBlockModel,
	WordCardModel,
	WordFormsModel,
	WordsBlockModel,
} from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import { fetchDictionaryArticle } from '../../lib/fetchDictionaryArticle'
import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
import './PhraseTranslationResult.scss'

/** Номера значений статьи. Пусто, если значение одно: тогда номер ничего не сообщает. */
const SenseNumbersContext = createContext<Map<SenseBlockModel, number>>(new Map())

function collectSenses(blocks: TranslationBlockModel[]): SenseBlockModel[] {
	return blocks.flatMap((block) => {
		if (block.type === 'sense') return [block, ...collectSenses(block.children)]
		return block.type === 'block' ? collectSenses(block.children) : []
	})
}

function numberSenses(blocks: TranslationBlockModel[]): Map<SenseBlockModel, number> {
	const senses = collectSenses(blocks)

	return new Map(senses.length > 1 ? senses.map((sense, senseIndex) => [sense, senseIndex + 1]) : [])
}

// ─── Component Registry ──────────────────────────────────────────────────────

type BlockComponent<P extends TranslationBlockModel = TranslationBlockModel> = ComponentType<{
	block: P
}>

const blockComponents: Record<TranslationBlockModel['type'], BlockComponent<any>> = {
	block: BlockRenderer,
	sense: SenseRenderer,
	example: ExampleRenderer,
	text: TextRenderer,
	words: WordsRenderer,
	list: ListRenderer,
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

function BlockTree({ blocks }: { blocks: TranslationBlockModel[] }) {
	return (
		<>
			{blocks.map((block, blockIndex) => {
				const Component = blockComponents[block.type]
				if (!Component) return null
				return <Component key={blockIndex} block={block} />
			})}
		</>
	)
}

// ─── PhraseTranslationResult ─────────────────────────────────────────────────

function PhraseTranslationResult() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const translation = usePhraseDictionaryStore((s) => s.translation)
	const inputText = usePhraseDictionaryStore((s) => s.inputText)

	if (status !== 'ready' || !translation || translation.blocks.length === 0) return null

	return (
		<div className='phrase-translation-result'>
			{translation.wordForms.map((wordForms) => (
				<WordFormsLine key={wordForms.forms.join(' ')} wordForms={wordForms} lookedUpText={inputText} />
			))}
			<SenseNumbersContext.Provider value={numberSenses(translation.blocks)}>
				<BlockTree blocks={translation.blocks} />
			</SenseNumbersContext.Provider>
			<BlockTree blocks={translation.deepSections} />
		</div>
	)
}

// ─── Word Forms ──────────────────────────────────────────────────────────────

function isLookedUpForm(form: string, lookedUpText: string): boolean {
	return form.split('/').includes(lookedUpText.trim().toLowerCase())
}

function WordFormsLine({ wordForms, lookedUpText }: { wordForms: WordFormsModel; lookedUpText: string }) {
	return (
		<p className='translation-word-forms'>
			{wordForms.forms.map((form, formIndex) => (
				<span key={formIndex} className='translation-word-forms__part'>
					{formIndex > 0 && <span className='translation-word-forms__arrow'>→</span>}
					<span
						className={
							isLookedUpForm(form, lookedUpText)
								? 'translation-word-forms__form translation-word-forms__form--current'
								: 'translation-word-forms__form'
						}
					>
						{form}
					</span>
				</span>
			))}
		</p>
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

/** Пояснения идут над картинкой, а первый пример — сразу под ней, как подпись. */
function SenseRenderer({ block }: { block: SenseBlockModel }) {
	const explanations = block.children.filter((child) => child.type !== 'example')
	const examples = block.children.filter((child) => child.type === 'example')
	const senseNumber = useContext(SenseNumbersContext).get(block)

	return (
		<div className='translation-sense'>
			{senseNumber !== undefined && <span className='translation-sense__number'>{senseNumber}</span>}
			<div className='translation-sense__content'>
				<h4 className='translation-sense__header'>{block.header}</h4>
				<BlockTree blocks={explanations} />
				{block.imageUrl && (
					<img
						src={block.imageUrl}
						alt={block.header}
						loading='lazy'
						className={`translation-sense__image translation-sense__image--${block.imageAspect ?? 'landscape'}`}
					/>
				)}
				<BlockTree blocks={examples} />
			</div>
		</div>
	)
}

function ExampleRenderer({ block }: { block: ExampleBlockModel }) {
	return (
		<div className='translation-example'>
			<StyledMarkdown content={block.sentence} className='translation-example__sentence' />
			<StyledMarkdown content={block.translation} className='translation-example__translation' />
		</div>
	)
}

function TextRenderer({ block }: { block: TextBlockModel }) {
	return <StyledMarkdown content={block.text} className='translation-text' />
}

function WordsRenderer({ block }: { block: WordsBlockModel }) {
	return (
		<div className='translation-words'>
			{block.currentWord && (
				<div className='translation-words__card translation-words__card--current'>
					<WordCardContent wordCard={block.currentWord} />
				</div>
			)}
			{block.similarWords.map((wordCard) => (
				<button
					key={wordCard.word}
					type='button'
					className='translation-words__card'
					onClick={() => fetchDictionaryArticle(wordCard.word)}
				>
					<WordCardContent wordCard={wordCard} />
				</button>
			))}
		</div>
	)
}

function WordCardContent({ wordCard }: { wordCard: WordCardModel }) {
	return (
		<>
			<span className='translation-words__word'>{wordCard.word}</span>
			<span className='translation-words__description'>{wordCard.description}</span>
		</>
	)
}

function ListRenderer({ block }: { block: ListBlockModel }) {
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

export default PhraseTranslationResult
