import { usePlayerControl } from '_pages/video/watching/video/VideoRoot/fn/playerControl'
import React, { useRef } from 'react'
import { useWatchingStore } from '../../watchingStore'
import { usePlayerController } from './fn/controller'
import VideoProgress from './VideoProgress'
import './VideoRoot.scss'

function VideoRoot() {
	const video = useWatchingStore((s) => s.video?.data)
	const fileUrl = video!.fileUrl as string

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
				onTimeUpdate={(e) =>
					setPlayerState({
						currentTime: e.currentTarget.currentTime,
					})
				}
				onLoadedMetadata={(e) =>
					setPlayerState({
						duration: e.currentTarget.duration,
					})
				}
				onPlay={() => setPlayerState({ paused: false })}
				onPause={() => setPlayerState({ paused: true })}
			/>
			<VideoProgress />
		</div>
	)
}

export default VideoRoot
