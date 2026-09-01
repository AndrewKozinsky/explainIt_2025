'use client'

import { useMemo } from 'react'
import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import SubtitlesStatusRouter from '@/entities/sentencesAndSubtitles/SubtitlesGuard/SubtitlesStatusRouter'
import SentencesOrSubtitles from '@/entities/sentencesAndSubtitles/ui/SentencesOrSubtitles/SentencesOrSubtitles'
import { SubtitlesStatusModelType, VideoContentType, VideoSubtitlesModel } from '@/entities/video/lib/types'
import { VideoPlayer } from '@/entities/videoPlayer'
import VideoWithSubtitles from '@/shared/ui/VideoWithSubtitles/VideoWithSubtitles'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { useVideoStore } from '../videoStore'
import { currentTimeSource } from './fn/currentTimeSource'
import { useVideoPlayback } from './fn/useVideoPlayback'

type VideoClientWrapperProps = {
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
		contentType,
		plainSentences,
		subtitles,
		fileUrl,
		youTubeVideoId,
		videoId,
		ratio,
		subtitlesStatus,
		subtitlesErrorCode,
		durationSeconds,
	} = props

	const mediaStore = useMediaStoreContext()
	const languageCode = mediaStore((s) => s.languageCode)
	const selectWord = mediaStore((s) => s.selectWord)
	const selectedSentenceId = mediaStore((s) => s.selectedSentenceId)
	const selectedWordId = mediaStore((s) => s.selectedWordId)

	const { command, handleCommandHandled } = useVideoPlayback({ videoId, subtitles })
	const saveProgress = useMemo(() => localStorageManager.videoProgress.createSaver(videoId), [videoId])

	const setPlayerState = useVideoStore((state) => state.setPlayerState)

	return (
		<VideoWithSubtitles>
			<VideoPlayer
				fileUrl={fileUrl}
				youTubeVideoId={youTubeVideoId}
				initialTime={localStorageManager.videoProgress.get(videoId)}
				ratio={ratio ?? undefined}
				command={command}
				onCommandHandled={handleCommandHandled}
				onTimeUpdate={(t) => setPlayerState({ currentTime: t })}
				onDurationChange={(d) => setPlayerState({ duration: d })}
				onPlayStateChange={(p) => setPlayerState({ paused: p })}
				onProgressSave={saveProgress}
				onEnded={() => localStorageManager.videoProgress.remove(videoId)}
			/>
			<SubtitlesStatusRouter
				subtitlesStatus={subtitlesStatus}
				subtitlesErrorCode={subtitlesErrorCode}
				durationSeconds={durationSeconds}
			>
				<SentencesOrSubtitles
					languageCode={languageCode!}
					timeSource={currentTimeSource}
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
