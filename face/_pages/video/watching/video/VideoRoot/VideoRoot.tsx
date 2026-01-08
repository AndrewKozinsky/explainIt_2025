import { usePlayerControl } from '_pages/video/watching/video/VideoRoot/fn/playerControl'
import {
	createVideoProgressSaver,
	loadVideoProgressSeconds,
} from '_pages/video/watching/video/VideoRoot/fn/videoProgressStorage'
import React, { useRef } from 'react'
import { useWatchingStore } from '../../watchingStore'
import { usePlayerController } from './fn/controller'
import VideoProgress from './VideoProgress'
import './VideoRoot.scss'

function VideoRoot() {
	const video = useWatchingStore((s) => s.video?.data)
	const fileUrl = video!.fileUrl as string
	const videoId = video!.id

	const saveProgress = createVideoProgressSaver(videoId)

	const playerWrapperRef = useRef<HTMLDivElement>(null)
	const playerRef = useRef<HTMLVideoElement>(null)

	const { setPlayerState } = useWatchingStore()

	usePlayerControl(playerWrapperRef)
	usePlayerController(playerRef)

	return (
		<div className='video-root' ref={playerWrapperRef}>
			<video
				src={fileUrl}
				className='video-root__video'
				ref={playerRef}
				onTimeUpdate={(e) => {
					const { currentTime } = e.currentTarget

					setPlayerState({
						currentTime,
					})

					saveProgress(currentTime)
				}}
				onLoadedMetadata={(e) => {
					setPlayerState({
						duration: e.currentTarget.duration,
					})

					const savedTime = loadVideoProgressSeconds(videoId)
					if (savedTime > 0 && savedTime < e.currentTarget.duration) {
						e.currentTarget.currentTime = savedTime
						setPlayerState({
							currentTime: savedTime,
						})
					}
				}}
				onPlay={() => setPlayerState({ paused: false })}
				onPause={() => setPlayerState({ paused: true })}
			/>
			<VideoProgress />
		</div>
	)
}

export default VideoRoot
