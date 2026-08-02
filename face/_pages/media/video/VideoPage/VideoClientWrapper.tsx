'use client'

import { useRef } from 'react'
import type { SelectionProps } from '@/entites/detailsBlock/SelectionProvider/MediaPageClient'
import { SentenceModel } from '@/entites/media/repository/SentenceTypes'
import VideoPlayer from '@/entites/players/VideoPlayer/VideoPlayer'
import type { VideoPlayerHandle } from '@/entites/players/VideoPlayer/VideoPlayer'
import SentencesOrSubtitles from '@/entites/sentencesAndSubtitles/SentencesOrSubtitles/SentencesOrSubtitles'
import SubtitlesGuard from '@/entites/video/ui/SubtitlesGuard/SubtitlesGuard'
import {
	SubtitlesStatusModelType,
	VideoContentType,
	VideoSubtitlesModel,
} from '@/entites/videos/repository/VideosRepository'
import VideoWithSubtitles from '@/shared/ui/VideoWithSubtitles/VideoWithSubtitles'
import { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { useVideoStore } from '../videoStore'

type VideoClientWrapperProps = SelectionProps & {
	languageCode: LanguageCode
	contentType: VideoContentType
	plainSentences: null | SentenceModel[]
	subtitles: null | VideoSubtitlesModel.Structure
	fileUrl: string
	videoId: number
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
}

function VideoClientWrapper(props: VideoClientWrapperProps) {
	const {
		languageCode,
		contentType,
		plainSentences,
		subtitles,
		fileUrl,
		videoId,
		subtitlesStatus,
		subtitlesErrorCode,
		selectedSentenceId = null,
		selectedWordId = null,
		selectWord = () => {},
	} = props

	const playerRef = useRef<VideoPlayerHandle>(null)

	const currentTime = useVideoStore((state) => state.player.currentTime)
	const setPlayerState = useVideoStore((state) => state.setPlayerState)

	return (
		<VideoWithSubtitles>
			<VideoPlayer
				ref={playerRef}
				fileUrl={fileUrl}
				videoId={videoId}
				initialTime={localStorageManager.videoProgress.get(videoId)}
				onTimeUpdate={(t) => setPlayerState({ currentTime: t })}
				onDurationChange={(d) => setPlayerState({ duration: d })}
				onPlayStateChange={(p) => setPlayerState({ paused: p })}
				onProgressSave={(id, seconds) => localStorageManager.videoProgress.set(id, seconds)}
			/>
			<SubtitlesGuard subtitlesStatus={subtitlesStatus} subtitlesErrorCode={subtitlesErrorCode}>
				<SentencesOrSubtitles
					languageCode={languageCode}
					contentType={contentType}
					currentTime={currentTime}
					selectedSentenceId={selectedSentenceId}
					selectedWordId={selectedWordId}
					selectWord={selectWord}
					plainSentences={plainSentences}
					subtitles={subtitles}
				/>
			</SubtitlesGuard>
		</VideoWithSubtitles>
	)
}

export default VideoClientWrapper
