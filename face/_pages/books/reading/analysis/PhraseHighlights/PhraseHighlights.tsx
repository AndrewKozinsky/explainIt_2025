import React from 'react'
import { useGetHighlights } from './fn/getStemps'
import './PhraseStamps.scss'

function PhraseHighlights() {
	const containerRef = React.useRef<HTMLDivElement | null>(null)

	const highlights = useGetHighlights(containerRef)

	return (
		<div className='phrase-highlights' ref={containerRef}>
			{highlights.map((s) => (
				<div
					key={s.key}
					className={s.classNames.join(' ')}
					style={{
						position: 'absolute',
						top: `${s.top}px`,
						left: `${s.left}px`,
						width: `${s.width}px`,
						height: `${s.height}px`,
					}}
				/>
			))}
		</div>
	)
}

export default PhraseHighlights
