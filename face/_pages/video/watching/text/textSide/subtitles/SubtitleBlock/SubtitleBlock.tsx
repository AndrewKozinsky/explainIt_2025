import cn from 'classnames'
import Word from '../Word/Word'
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
				{subtitle.texts.map((text) => {
					return text.textParts.map((textPart) => {
						if (textPart.type === 'word') {
							return <Word wordData={textPart} subtitle={subtitle} key={textPart.id} />
						} else if (textPart.type === 'punctuation') {
							return <span key={textPart.id}>{textPart.value}</span>
						} else if (textPart.type === 'space') {
							return <span key={textPart.id}> </span>
						}
					})
				})}
			</p>
			{/*{subtitle.translation && <p className='subtitle-block__translation'>{subtitle.translation}</p>}*/}
		</div>
	)
}

export default SubtitleBlock
