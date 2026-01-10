import cn from 'classnames'
import { Fragment } from 'react'
import Word from '../../common/Word/Word'
import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import './SubtitleBlock.scss'

type SubtitleBlockProps = {
	subtitle: PopulatedSubtitlesStructure.Subtitle
	isCurrent: boolean
	subtitleId: number
}

function SubtitleBlock(props: SubtitleBlockProps) {
	const { subtitle, isCurrent, subtitleId } = props

	return (
		<div className='subtitle-block' data-subtitle-id={subtitleId}>
			<p className={cn('subtitle-block__subtitle', isCurrent && 'subtitle-block__subtitle--current')}>
				{subtitle.texts.map((text, textIndex) => {
					return (
						<Fragment key={text.sentenceId}>
							{text.textParts.map((textPart) => {
								if (textPart.type === 'word') {
									return (
										<Word
											contentType='subtitles'
											subtitleId={subtitle.id}
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
							})}
							{textIndex < subtitle.texts.length - 1 && <span> </span>}
						</Fragment>
					)
				})}
			</p>
		</div>
	)
}

export default SubtitleBlock
