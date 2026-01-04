import React, { useEffect, useRef } from 'react'
import { useWatchingStore } from '../../watchingStore'
import './VideoRoot.scss'

function VideoRoot() {
	const video = useWatchingStore((s) => s.video?.data)
	const fileUrl = video!.fileUrl as string

	const videoRef = useRef(null)

	useEffect(
		function () {
			if (!videoRef?.current) return
		},
		[videoRef],
	)

	return (
		<div className='video-root'>
			<video src={fileUrl} className='video-root__video' autoPlay ref={videoRef} />
		</div>
	)
}

export default VideoRoot
