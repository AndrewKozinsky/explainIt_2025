import { useChapterTooltip } from './fn/useChapterTooltip'
import './ChapterTooltip.scss'

function ChapterTooltip() {
	const { tooltipRef, coords, phrases, show } = useChapterTooltip()

	if (!show || !coords) return null

	return (
		<div className='chapter-tooltip' ref={tooltipRef} style={{ left: coords.left, top: coords.top }}>
			{phrases.map((p) => (
				<div className='chapter-tooltip__item' key={p.id}>
					<span className='chapter-tooltip__phrase'>{p.phrase}</span>
					<span className='chapter-tooltip__translation'>{p.analysis.translation}</span>
				</div>
			))}
		</div>
	)
}

export default ChapterTooltip
