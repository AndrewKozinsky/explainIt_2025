import { useRef } from 'react'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import SpeechlessBar from '../SpeechlessBar/SpeechlessBar'
import SubtitleBlock from '../SubtitleBlock/SubtitleBlock'
import { useSubtitlesPlaybackDomSync } from './fn/useSubtitlesPlaybackDomSync'
import './SubtitlesContent.scss'

function SubtitlesContent() {
	const subtitles = useWatchingStore((s) => s.populatedSubtitles.subtitles)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useSubtitlesPlaybackDomSync({ containerRef, subtitles })

	return (
		<div className='subtitles-content' ref={containerRef}>
			{subtitles.map((item) => {
				if (item.type === 'subtitle') {
					return <SubtitleBlock subtitle={item} key={item.id} />
				}

				return <SpeechlessBar key={item.id} subtitleId={item.id} />
			})}
		</div>
	)
}

export default SubtitlesContent
