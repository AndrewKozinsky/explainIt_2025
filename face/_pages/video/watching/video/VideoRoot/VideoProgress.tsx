import React, { useMemo, useRef } from 'react'
import { useWatchingStore } from '../../watchingStore'

function VideoProgress() {
	const progressRef = useRef<HTMLDivElement>(null)
	const dragPointerIdRef = useRef<null | number>(null)

	const currentTime = useWatchingStore((s) => s.player.currentTime)
	const duration = useWatchingStore((s) => s.player.duration)
	const sendPlayerCommand = useWatchingStore((s) => s.sendPlayerCommand)

	const progressPercent = useMemo(() => {
		if (!duration) return 0

		return Math.max(0, Math.min(1, currentTime / duration))
	}, [currentTime, duration])

	function setTimeByClientX(clientX: number) {
		if (!progressRef.current) return
		if (!duration) return

		const rect = progressRef.current.getBoundingClientRect()
		const ratio = (clientX - rect.left) / rect.width
		const clampedRatio = Math.max(0, Math.min(1, ratio))
		sendPlayerCommand({ type: 'SET_TIME', time: clampedRatio * duration })
	}

	return (
		<div
			className='video-root__progress'
			ref={progressRef}
			onPointerDownCapture={(e) => {
				e.stopPropagation()
				e.preventDefault()

				if (!progressRef.current) return
				if (!duration) return

				dragPointerIdRef.current = e.pointerId

				try {
					progressRef.current.setPointerCapture(e.pointerId)
				} catch {
					// ignore
				}

				setTimeByClientX(e.clientX)
			}}
			onPointerMoveCapture={(e) => {
				if (dragPointerIdRef.current === null) return
				if (e.pointerId !== dragPointerIdRef.current) return

				e.stopPropagation()
				e.preventDefault()

				setTimeByClientX(e.clientX)
			}}
			onPointerUpCapture={(e) => {
				e.stopPropagation()

				if (dragPointerIdRef.current !== e.pointerId) return
				dragPointerIdRef.current = null

				if (!progressRef.current) return

				try {
					progressRef.current.releasePointerCapture(e.pointerId)
				} catch {
					// ignore
				}
			}}
			onPointerCancelCapture={(e) => {
				e.stopPropagation()

				if (dragPointerIdRef.current !== e.pointerId) return
				dragPointerIdRef.current = null

				if (!progressRef.current) return

				try {
					progressRef.current.releasePointerCapture(e.pointerId)
				} catch {
					// ignore
				}
			}}
			onClick={(e) => {
				e.stopPropagation()
			}}
		>
			<div className='video-root__progress-bar' style={{ width: `${progressPercent * 100}%` }} />
		</div>
	)
}

export default VideoProgress
