import { useContext } from 'react'
import type { SenseBlockModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import ArticleBlockTree from '../ArticleBlockTree/ArticleBlockTree'
import { SenseNumbersContext } from '../senseNumbers'
import './SenseBlock.scss'

/** Одно значение слова. Пояснения идут над картинкой, а первый пример — сразу под ней. */
function SenseBlock({ block }: { block: SenseBlockModel }) {
	const explanations = block.children.filter((child) => child.type !== 'example')
	const examples = block.children.filter((child) => child.type === 'example')
	const senseNumber = useContext(SenseNumbersContext).get(block)

	return (
		<div className='translation-sense'>
			{senseNumber !== undefined && <span className='translation-sense__number'>{senseNumber}</span>}
			<div className='translation-sense__content'>
				<h4 className='translation-sense__header'>{block.header}</h4>
				<ArticleBlockTree blocks={explanations} />
				{block.imageUrl && (
					<img
						src={block.imageUrl}
						alt={block.header}
						loading='lazy'
						className={`translation-sense__image translation-sense__image--${block.imageAspect ?? 'landscape'}`}
					/>
				)}
				<ArticleBlockTree blocks={examples} />
			</div>
		</div>
	)
}

export default SenseBlock
