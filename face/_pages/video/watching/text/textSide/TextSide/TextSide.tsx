import React from 'react'
import SubtitlesContent from '_pages/video/watching/text/textSide/subtitles/SubtitlesContent/SubtitlesContent'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import FullScreenButton from '../FullScreenButton/FullScreenButton'
import PlainTextContent from '../plainText/PlainTextContent/PlainTextContent'
import './TextSide.scss'

function TextSide() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)

	return (
		<div className='watching-text-side'>
			<div className='watching-text-side__content'>
				{populatedPlainText && <PlainTextContent />}
				{populatedSubtitles && <SubtitlesContent />}
			</div>
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
