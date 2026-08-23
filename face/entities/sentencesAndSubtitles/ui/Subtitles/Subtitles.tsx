// import { Fragment, useRef } from 'react'
// import type { VideoSubtitlesModel } from '@/entities/video/repository/VideosRepository'
// import { LanguageCode } from '@/shared/utils/languages'
// import SpeechlessBar from '../SpeechlessBar/SpeechlessBar'
// import SubtitleBlock from '../SubtitleBlock/SubtitleBlock'
// import SubtitleBlockGap from '../SubtitleBlockGap/SubtitleBlockGap'
// import { useSelectWordScroll } from './fn/useSelectWordScroll'
// import { useSubtitlesPlaybackDomSync } from './fn/useSubtitlesPlaybackDomSync'
// import './Subtitles.scss'

/*type SubtitlesContentProps = {
	subtitles: (VideoSubtitlesModel.Subtitle | VideoSubtitlesModel.SpeechlessBar)[]
	currentTime: number
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
}*/

/*function Subtitles(props: SubtitlesContentProps) {
	const { subtitles, currentTime, selectedSentenceId, selectedWordId, selectWord, languageCode } = props
	const containerRef = useRef<HTMLDivElement | null>(null)

	const { scrollToSubtitle } = useSubtitlesPlaybackDomSync({ containerRef, subtitles, currentTime })
	const handleSelectWord = useSelectWordScroll({ subtitles, selectWord, scrollToSubtitle })

	return (
		<div className='subtitles' ref={containerRef}>
			{subtitles.map((item, index) => {
				if (item.type === 'subtitle') {
					// Между двумя смежными субтитрами (без SpeechlessBar) добавляем зазор,
					// чтобы визуальное расстояние между субтитрами всегда было одинаковым.
					const nextItem = subtitles[index + 1]
					const hasGapAfter = nextItem?.type === 'subtitle'

					return (
						<Fragment key={item.id}>
							<SubtitleBlock
								subtitle={item}
								selectedSentenceId={selectedSentenceId}
								selectedWordId={selectedWordId}
								selectWord={handleSelectWord}
								languageCode={languageCode}
							/>
							{hasGapAfter && <SubtitleBlockGap />}
						</Fragment>
					)
				}

				return <SpeechlessBar key={item.id} subtitleId={item.id} />
			})}
		</div>
	)
}*/

// export default Subtitles
