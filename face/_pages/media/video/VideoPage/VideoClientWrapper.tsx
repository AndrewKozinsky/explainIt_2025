'use client'

import { useRef } from 'react'
import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import VideoPlayer from '@/entities/players/VideoPlayer/VideoPlayer'
import type { VideoPlayerHandle } from '@/entities/players/VideoPlayer/VideoPlayer'
import SentencesOrSubtitles from '@/entities/sentencesAndSubtitles/SentencesOrSubtitles/SentencesOrSubtitles'
import type { SubtitlesStatusModelType, VideoContentType, VideoSubtitlesModel } from '@/entities/video/lib/types'
import SubtitlesStatusRouter from '@/entities/video/ui/SubtitlesGuard/SubtitlesStatusRouter'
import VideoWithSubtitles from '@/shared/ui/VideoWithSubtitles/VideoWithSubtitles'
import type { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { useYouTubeVideoStore } from '../videoStore'

type VideoClientWrapperProps = {
	selectedSentenceId?: null | number
	selectedWordId?: null | number
	selectWord?: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
	contentType: VideoContentType
	plainSentences: null | SentenceModel[]
	subtitles: null | VideoSubtitlesModel.Structure
	fileUrl?: string
	youTubeVideoId?: string
	videoId: number
	ratio?: null | string
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
	durationSeconds: number
}

function VideoClientWrapper(props: VideoClientWrapperProps) {
	const {
		languageCode,
		contentType,
		plainSentences,
		subtitles,
		fileUrl,
		youTubeVideoId,
		videoId,
		ratio,
		subtitlesStatus,
		subtitlesErrorCode,
		selectedSentenceId = null,
		selectedWordId = null,
		selectWord = () => {},
		durationSeconds,
	} = props

	const playerRef = useRef<VideoPlayerHandle>(null)

	const currentTime = useYouTubeVideoStore((state) => state.player.currentTime)
	const setPlayerState = useYouTubeVideoStore((state) => state.setPlayerState)

	return (
		<VideoWithSubtitles>
			<VideoPlayer
				ref={playerRef}
				fileUrl={fileUrl}
				youTubeVideoId={youTubeVideoId}
				videoId={videoId}
				initialTime={localStorageManager.videoProgress.get(videoId)}
				ratio={ratio ?? undefined}
				onTimeUpdate={(t) => setPlayerState({ currentTime: t })}
				onDurationChange={(d) => setPlayerState({ duration: d })}
				onPlayStateChange={(p) => setPlayerState({ paused: p })}
				onProgressSave={(id, seconds) => localStorageManager.videoProgress.set(id, seconds)}
				onEnded={() => localStorageManager.videoProgress.remove(videoId)}
			/>
			<SubtitlesStatusRouter
				subtitlesStatus={subtitlesStatus}
				subtitlesErrorCode={subtitlesErrorCode}
				durationSeconds={durationSeconds}
			>
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
			</SubtitlesStatusRouter>
		</VideoWithSubtitles>
	)
}

export default VideoClientWrapper
