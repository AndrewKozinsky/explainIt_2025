import React from 'react'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import SubtitleBlock from '../SubtitleBlock/SubtitleBlock'
import SpeechlessBar from '../SpeechlessBar/SpeechlessBar'
import { useGetCurrentSubtitleId } from './fn/getCurrentSubtitleId'
import './SubtitlesContent.scss'

function SubtitlesContent() {
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)
	const currentSubtitleId = useGetCurrentSubtitleId()

	return (
		<div className='subtitles-content'>
			{populatedSubtitles.subtitles.map((item, index) => {
				if (item.type === 'subtitle') {
					return <SubtitleBlock subtitle={item} key={index} isCurrent={currentSubtitleId === item.id} />
				}
				return <SpeechlessBar key={index} isCurrent={currentSubtitleId === item.id} />
			})}
		</div>
	)
}

export default SubtitlesContent
