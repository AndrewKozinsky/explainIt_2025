import React, { useRef } from 'react'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import SubtitleBlock from '../SubtitleBlock/SubtitleBlock'
import SpeechlessBar from '../SpeechlessBar/SpeechlessBar'
import { useAutoScrollCurrentSubtitle } from './fn/useAutoScrollCurrentSubtitle'
import { useGetCurrentSubtitleId } from './fn/getCurrentSubtitleId'
import './SubtitlesContent.scss'

function SubtitlesContent() {
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)
	const currentSubtitleId = useGetCurrentSubtitleId()
	const containerRef = useRef<HTMLDivElement | null>(null)

	useAutoScrollCurrentSubtitle({ containerRef, currentSubtitleId })

	return (
		<div className='subtitles-content' ref={containerRef}>
			{populatedSubtitles.subtitles.map((item, index) => {
				if (item.type === 'subtitle') {
					return (
						<SubtitleBlock
							subtitle={item}
							key={index}
							subtitleId={item.id}
							isCurrent={currentSubtitleId === item.id}
						/>
					)
				}
				return <SpeechlessBar key={index} subtitleId={item.id} isCurrent={currentSubtitleId === item.id} />
			})}
		</div>
	)
}

export default SubtitlesContent
