'use client'

import NativePlayerCore from '@/entities/videoPlayer/NativePlayerCore/NativePlayerCore'
import YouTubePlayerCore from '@/entities/videoPlayer/YouTubePlayerCore/YouTubePlayerCore'
import type { PlayerCommandEvent } from './fn/types'
import './VideoPlayer.scss'

export type VideoPlayerProps = {
	/** URL видеофайла (S3). Если передан — используется нативный <video>. */
	fileUrl?: string
	/** ID видео на YouTube. Если передан — используется YouTube IFrame Player. */
	youTubeVideoId?: string
	/** Соотношение сторон плеера в CSS-формате "1280 / 720". */
	ratio?: string
	initialTime?: number
	/** Следующая команда, которую адаптер должен исполнить. */
	command?: PlayerCommandEvent | null
	/** Вызывается, когда адаптер принял команду. */
	onCommandHandled?: (id: number) => void
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	onEnded?: () => void
	onProgressSave?: (seconds: number) => void
}

/**
 * Тонкий селектор адаптера проигрывания.
 *
 * Компонент не хранит команд, не задаёт политику воспроизведения и не
 * инициирует действий: он передаёт очередную команду выбранному адаптеру.
 */
function VideoPlayer(props: VideoPlayerProps) {
	const { fileUrl, youTubeVideoId, ...commonProps } = props

	return (
		<>
			{fileUrl && <NativePlayerCore fileUrl={fileUrl} {...commonProps} />}
			{youTubeVideoId && <YouTubePlayerCore youTubeVideoId={youTubeVideoId} {...commonProps} />}
		</>
	)
}

export default VideoPlayer
