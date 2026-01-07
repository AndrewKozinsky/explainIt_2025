import { useWatchingStore } from '_pages/video/watching/watchingStore'
import React from 'react'
import FullScreenButton from '../FullScreenButton/FullScreenButton'
import PlainTextContent from '../PlainTextContent/PlainTextContent'
import './TextSide.scss'

function TextSide() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)

	return (
		<div className='watching-text-side'>
			<div className='watching-text-side__content'>{populatedPlainText && <PlainTextContent />}</div>
			<div className='watching-text-side__bottom'>
				<div className='watching-text-side__bottom-buttons'>Left</div>
				<div className='watching-text-side__bottom-info'>
					<FullScreenButton />
				</div>
			</div>
		</div>
	)
}

export default TextSide
