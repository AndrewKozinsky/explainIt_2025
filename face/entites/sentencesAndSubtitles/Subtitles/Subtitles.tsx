import { useRef } from 'react'
import type { VideoSubtitlesModel } from '@/entites/videos/repository/VideosRepository'
import { LanguageCode } from '@/shared/utils/languages'
import SpeechlessBar from '../SpeechlessBar/SpeechlessBar'
import SubtitleBlock from '../SubtitleBlock/SubtitleBlock'
import { useSubtitlesPlaybackDomSync } from './fn/useSubtitlesPlaybackDomSync'
import './Subtitles.scss'

type SubtitlesContentProps = {
	subtitles: (VideoSubtitlesModel.Subtitle | VideoSubtitlesModel.SpeechlessBar)[]
	currentTime: number
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
}

function Subtitles(props: SubtitlesContentProps) {
	const { subtitles, currentTime, selectedSentenceId, selectedWordId, selectWord, languageCode } = props
	const containerRef = useRef<HTMLDivElement | null>(null)

	useSubtitlesPlaybackDomSync({ containerRef, subtitles, currentTime })

	return (
		<div className='subtitles' ref={containerRef}>
			{subtitles.map((item) => {
				if (item.type === 'subtitle') {
					return (
						<SubtitleBlock
							subtitle={item}
							key={item.id}
							selectedSentenceId={selectedSentenceId}
							selectedWordId={selectedWordId}
							selectWord={selectWord}
							languageCode={languageCode}
						/>
					)
				}

				return <SpeechlessBar key={item.id} subtitleId={item.id} />
			})}
		</div>
	)
}

export default Subtitles
