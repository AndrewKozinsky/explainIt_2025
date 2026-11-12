'use client'

import { PlayIcon } from '@/shared/ui/icons/mainPage/PlayIcon'
import { useDemoVideoPlayer } from './fn/useDemoVideoPlayer'
import './DemoVideoPlayer.scss'

type DemoVideoPlayerProps = {
	videoUrl: string
	posterUrl: string
	// Описание видео для экранного диктора
	videoLabel: string
	// Подпись кнопки запуска для экранного диктора
	playLabel: string
}

/** Видео в рамке. Пока его не запускали, поверх лежит затемнение с большим значком воспроизведения */
function DemoVideoPlayer(props: DemoVideoPlayerProps) {
	const { videoUrl, posterUrl, videoLabel, playLabel } = props
	const { videoRef, isCovered, startPlaying, resetAfterEnd } = useDemoVideoPlayer()

	// preload="none": видео около 9 МБ скачивается только после запуска.
	// Свои кнопки управления браузер показывает только после снятия затемнения
	return (
		<div className='demo-video-player'>
			<video
				className='demo-video-player__video'
				ref={videoRef}
				src={videoUrl}
				poster={posterUrl}
				width={1500}
				height={834}
				aria-label={videoLabel}
				controls={!isCovered}
				playsInline
				preload='none'
				onEnded={resetAfterEnd}
			/>
			{isCovered && (
				<button
					type='button'
					className='demo-video-player__cover'
					aria-label={playLabel}
					onClick={startPlaying}
				>
					<span className='demo-video-player__play'>
						<PlayIcon extraClass='demo-video-player__play-icon' />
					</span>
				</button>
			)}
		</div>
	)
}

export default DemoVideoPlayer
