// 'use client'

// import { useRef } from 'react'
// import type { SelectionProps } from '@/entities/detailsBlock/SelectionProvider/MediaPageClient'
// import { SentenceModel } from '@/entities/media/repository/SentenceTypes'
// import VideoPlayer from '@/entities/players/VideoPlayer/VideoPlayer'
// import type { VideoPlayerHandle } from '@/entities/players/VideoPlayer/VideoPlayer'
// import SentencesOrSubtitles from '@/entities/sentencesAndSubtitles/SentencesOrSubtitles/SentencesOrSubtitles'
// import {
// 	SubtitlesStatusModelType,
// 	VideoContentType,
// 	VideoSubtitlesModel,
// } from '@/entities/video/repository/VideosRepository'
// import SubtitlesGuard from '@/entities/video/ui/SubtitlesGuard/SubtitlesGuard'
// import VideoWithSubtitles from '@/shared/ui/VideoWithSubtitles/VideoWithSubtitles'
// import { LanguageCode } from '@/shared/utils/languages'
// import { localStorageManager } from '@/shared/utils/localStorageManager'
// import { useYouTubeVideoStore } from '../youTubeVideoStore'

/*type VideoClientWrapperProps = SelectionProps & {
	languageCode: LanguageCode
	contentType: VideoContentType
	plainSentences: null | SentenceModel[]
	subtitles: null | VideoSubtitlesModel.Structure
	youTubeVideoId: string
	videoId: number
	ratio?: null | string
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
}*/

/*function YouTubeVideoClientWrapper(props: VideoClientWrapperProps) {
	const {
		languageCode,
		contentType,
		plainSentences,
		subtitles,
		youTubeVideoId,
		videoId,
		ratio,
		subtitlesStatus,
		subtitlesErrorCode,
		selectedSentenceId = null,
		selectedWordId = null,
		selectWord = () => {},
	} = props

	const playerRef = useRef<VideoPlayerHandle>(null)

	const currentTime = useYouTubeVideoStore((state) => state.player.currentTime)
	const setPlayerState = useYouTubeVideoStore((state) => state.setPlayerState)

	return (
		<VideoWithSubtitles>
			<VideoPlayer
				ref={playerRef}
				youTubeVideoId={youTubeVideoId}
				videoId={videoId}
				initialTime={localStorageManager.videoProgress.get(videoId)}
				ratio={ratio ?? undefined}
				onTimeUpdate={(t) => setPlayerState({ currentTime: t })}
				onDurationChange={(d) => setPlayerState({ duration: d })}
				onPlayStateChange={(p) => setPlayerState({ paused: p })}
				onProgressSave={(id, seconds) => localStorageManager.videoProgress.set(id, seconds)}
			/>
			<SubtitlesGuard subtitlesStatus={subtitlesStatus} subtitlesErrorCode={subtitlesErrorCode}>
				<SentencesOrSubtitles
					languageCode={languageCode}
					currentTime={currentTime}
					selectedSentenceId={selectedSentenceId}
					selectedWordId={selectedWordId}
					selectWord={selectWord}
					contentType={contentType}
					plainSentences={plainSentences}
					subtitles={subtitles}
				/>
			</SubtitlesGuard>
		</VideoWithSubtitles>
	)
}*/

// export default YouTubeVideoClientWrapper
