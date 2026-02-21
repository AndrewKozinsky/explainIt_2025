import React, { useRef } from 'react'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import SpeechlessBar from '../SpeechlessBar/SpeechlessBar'
import SubtitleBlock from '../SubtitleBlock/SubtitleBlock'
import { useGetCurrentSubtitleId } from './fn/getCurrentSubtitleId'
import { useAutoScrollCurrentSubtitle } from './fn/useAutoScrollCurrentSubtitle'
import './SubtitlesContent.scss'

function SubtitlesContent() {
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)
	const currentSubtitleId = useGetCurrentSubtitleId()
	const containerRef = useRef<HTMLDivElement | null>(null)

	useAutoScrollCurrentSubtitle({ containerRef, currentSubtitleId })

	// Определяем, в каком субтитре начинается каждое предложение
	const firstSentenceStartSubtitleId = new Map<number, number>()
	for (const item of populatedSubtitles.subtitles) {
		if (item.type !== 'subtitle') continue
		for (const text of item.texts) {
			if (!firstSentenceStartSubtitleId.has(text.sentenceId)) {
				firstSentenceStartSubtitleId.set(text.sentenceId, item.id)
			}
		}
	}

	return (
		<div className='subtitles-content' ref={containerRef}>
			{populatedSubtitles.subtitles.map((item, index) => {
				if (item.type === 'subtitle') {
					return <SubtitleBlock subtitle={item} key={index} isCurrent={currentSubtitleId === item.id} />
				}

				return <SpeechlessBar key={index} subtitleId={item.id} isCurrent={currentSubtitleId === item.id} />
			})}
		</div>
	)
}

export default SubtitlesContent
