// import { createContext, useContext } from 'react'
// import type { ComponentType } from 'react'
// import type {
// 	TranslationBlockModel,
// 	BlockBlockModel,
// 	UseCaseBlockModel,
// 	PaperBlockModel,
// 	ExampleBlockModel,
// 	TextBlockModel,
// } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
// import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
// import { usePhraseDictionaryStore } from '../phraseDictionaryStore'
// import './PhraseTranslationResult.scss'

// ─── Component Registry ──────────────────────────────────────────────────────

/*type BlockComponent<P extends TranslationBlockModel = TranslationBlockModel> = ComponentType<{
	block: P
	index: number
}>*/

/*const blockComponents: Record<TranslationBlockModel['type'], BlockComponent<any>> = {
	block: BlockRenderer,
	useCase: UseCaseRenderer,
	paper: PaperRenderer,
	example: ExampleRenderer,
	text: TextRenderer,
}*/

// ─── Entry Point ─────────────────────────────────────────────────────────────

/*function BlockTree({ blocks }: { blocks: TranslationBlockModel[] }) {
	return (
		<>
			{blocks.map((block, i) => {
				const Component = blockComponents[block.type]
				if (!Component) return null
				return <Component key={i} block={block} index={i} />
			})}
		</>
	)
}*/

// ─── PhraseTranslationResult ─────────────────────────────────────────────────

// const UseCaseNumbersContext = createContext<WeakMap<TranslationBlockModel, number> | null>(null)

/*function numberUseCases(blocks: TranslationBlockModel[]): WeakMap<TranslationBlockModel, number> {
	const numbers = new WeakMap<TranslationBlockModel, number>()
	let counter = 0

	const visit = (list: TranslationBlockModel[]) => {
		for (const block of list) {
			if (block.type === 'useCase') {
				counter += 1
				numbers.set(block, counter)
			}
			if ('children' in block) visit(block.children)
		}
	}

	visit(blocks)
	return numbers
}*/

/*function PhraseTranslationResult() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const translation = usePhraseDictionaryStore((s) => s.translation)

	if (status !== 'ready' || !translation || !Array.isArray(translation) || translation.length === 0) return null

	const useCaseNumbers = numberUseCases(translation)

	return (
		<div className='phrase-translation-result'>
			<UseCaseNumbersContext.Provider value={useCaseNumbers}>
				<BlockTree blocks={translation} />
			</UseCaseNumbersContext.Provider>
		</div>
	)
}*/

// ─── Block Renderers ─────────────────────────────────────────────────────────

/*function BlockRenderer({ block }: { block: BlockBlockModel }) {
	return (
		<section className='translation-block'>
			<h3 className='translation-block__header'>{block.header}</h3>
			<BlockTree blocks={block.children} />
		</section>
	)
}*/

/*function UseCaseRenderer({ block }: { block: UseCaseBlockModel }) {
	const useCaseNumbers = useContext(UseCaseNumbersContext)
	const number = useCaseNumbers?.get(block)

	return (
		<div className='translation-use-case'>
			<h4 className='translation-use-case__header'>
				<span className='translation-use-case__number'>{number}</span>
				{block.header}
			</h4>
			<BlockTree blocks={block.children} />
		</div>
	)
}*/

/*function PaperRenderer({ block }: { block: PaperBlockModel }) {
	return (
		<div className='translation-paper'>
			<BlockTree blocks={block.children} />
		</div>
	)
}*/

/*function ExampleRenderer({ block }: { block: ExampleBlockModel }) {
	return (
		<div className='translation-example'>
			<p className='translation-example__sentence'>{block.sentence}</p>
			<p className='translation-example__translation'>{block.translation}</p>
		</div>
	)
}*/

/*function TextRenderer({ block }: { block: TextBlockModel }) {
	return <StyledMarkdown content={block.text} />
}*/

// export default PhraseTranslationResult
