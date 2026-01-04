import React from 'react'
import { useWatchingStore } from '../../watchingStore'
import { useVideoController } from './fn/controller'
import './VideoRoot.scss'

function VideoRoot() {
	const video = useWatchingStore((s) => s.video?.data)
	const fileUrl = video!.fileUrl as string

	const { setPlayerState } = useWatchingStore()
	const videoRef = useVideoController()

	return (
		<div className='video-root'>
			<video
				src={fileUrl}
				className='video-root__video'
				ref={videoRef}
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
		</div>
	)
}

export default VideoRoot
