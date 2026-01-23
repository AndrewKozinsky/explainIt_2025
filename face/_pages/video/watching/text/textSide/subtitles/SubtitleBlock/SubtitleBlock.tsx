// import { Fragment, useMemo } from 'react'
// import cn from 'classnames'
// import { PopulatedSubtitlesStructure } from '@/_pages/video/watching/common/populatedSubtitlesStructure'
// import { useWatchingStore } from '@/_pages/video/watching/watchingStore'
// import Word from '../../common/Word/Word'
// import './SubtitleBlock.scss'

/*type SubtitleBlockProps = {
	subtitle: PopulatedSubtitlesStructure.Subtitle
	isCurrent: boolean
	// Идентификаторы предложений, которые начинаются в данном субтитре.
	// Если не переданы, компонент отрисует все тексты субтитра; переводы ниже появятся только если есть такие идентификаторы.
	startingSentenceIds?: number[]
}*/

/*function SubtitleBlock(props: SubtitleBlockProps) {
	const { subtitle, isCurrent, startingSentenceIds } = props

	// Достаём предложения с переводами из Хранилища
	const sentences = useWatchingStore((s) => s.populatedSubtitles.sentences)

	// Готовим переводы для предложений, которые начинаются в этом субтитре
	const translationsToRender = useMemo(() => {
		if (!startingSentenceIds || startingSentenceIds.length === 0) return [] as string[]
		const byId = new Map<number, { translation?: string }>(sentences.map((s) => [s.id, s]))

		return startingSentenceIds
			.map((id) => byId.get(id)?.translation?.trim())
			.filter((t): t is string => !!t && t.length > 0)
	}, [sentences, startingSentenceIds])

	return (
		<div className='subtitle-block' data-subtitle-id={subtitle.id}>
			<p className={cn('subtitle-block__subtitle', isCurrent && 'subtitle-block__subtitle--current')}>
				{subtitle.texts.map((text, textIndex) => {
					return (
						<Fragment key={text.sentenceId}>
							{text.textParts.map((textPart) => {
								if (textPart.type === 'word') {
									return (
										<Word
											contentType='subtitles'
											sentenceId={text.sentenceId}
											wordId={textPart.id}
											wordValue={textPart.value}
											key={textPart.id}
										/>
									)
								} else if (textPart.type === 'punctuation') {
									return <span key={textPart.id}>{textPart.value}</span>
								} else if (textPart.type === 'space') {
									return <span key={textPart.id}> </span>
								}
								return null
							})}
							{textIndex < subtitle.texts.length - 1 && <span> </span>}
						</Fragment>
					)
				})}
			</p>
			{translationsToRender.length > 0 && (
				<p className='subtitle-block__translation'>{translationsToRender.join(' ')}</p>
			)}
		</div>
	)
}*/

// export default SubtitleBlock
