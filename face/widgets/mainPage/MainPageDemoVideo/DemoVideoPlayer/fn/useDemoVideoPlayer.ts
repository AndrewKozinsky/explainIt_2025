import { useRef, useState } from 'react'

/**
 * Состояние видео с затемнением: пока видео не запускали, поверх него затемнение со значком.
 * Нажатие убирает затемнение и запускает видео. Пауза затемнение не возвращает:
 * оно появляется снова, только когда видео доиграло до конца и перемоталось в начало
 */
export function useDemoVideoPlayer() {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isCovered, setIsCovered] = useState(true)

	function startPlaying() {
		setIsCovered(false)
		// Если браузер не дал запустить видео, у него уже видны свои кнопки управления
		videoRef.current?.play().catch(function () {})
	}

	function resetAfterEnd() {
		if (!videoRef.current) return

		videoRef.current.currentTime = 0
		setIsCovered(true)
	}

	return { videoRef, isCovered, startPlaying, resetAfterEnd }
}
