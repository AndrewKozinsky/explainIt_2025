import { VideoControlPlay } from '@/shared/ui/icons/videoControls/VideoControlPlay'
import { VideoControlPlayAndStop } from '@/shared/ui/icons/videoControls/VideoControlPlayAndStop'
import { VideoControlRevert } from '@/shared/ui/icons/videoControls/VideoControlRevert'
import { VideoControlToLeftIcon } from '@/shared/ui/icons/videoControls/VideoControlToLeftIcon'
import { VideoControlToRightIcon } from '@/shared/ui/icons/videoControls/VideoControlToRightIcon'
import VideoControlButton from '../VideoControlButton/VideoControlButton'
import './VideoControls.scss'

export type PlaybackMode = 'video' | 'shadowing' | 'subAndRevert' | 'sub'

type VideoControlsProps = {
	toVideoStart: () => void
	playVideo: () => void
	playVideoShadowing: () => void
	toPrevSub: () => void
	playSubAndRevert: () => void
	playSub: () => void
	toNextSub: () => void
	areSubsAvailable: boolean
	activeMode: PlaybackMode
}

function VideoControls(props: VideoControlsProps) {
	const {
		toVideoStart,
		playVideo,
		playVideoShadowing,
		toPrevSub,
		playSubAndRevert,
		playSub,
		toNextSub,
		areSubsAvailable,
		activeMode,
	} = props

	return (
		<div className='video-controls'>
			<VideoControlButton onClick={toVideoStart} icon={<VideoControlToLeftIcon />} />
			<VideoControlButton onClick={playVideo} icon={<VideoControlPlay />} active={activeMode === 'video'} />
			{/*<VideoControlButton
				onClick={playVideoShadowing}
				icon={<VideoControlPlayAndStop />}
				disabled={!areSubsAvailable}
				active={activeMode === 'shadowing'}
			/>*/}
			<div className='video-controls__spacer' />
			{/*<VideoControlButton onClick={toPrevSub} icon={<VideoControlToLeftIcon />} disabled={!areSubsAvailable} />*/}
			{/*<VideoControlButton
				onClick={playSubAndRevert}
				icon={<VideoControlRevert />}
				disabled={!areSubsAvailable}
				active={activeMode === 'subAndRevert'}
			/>*/}
			{/*<VideoControlButton
				onClick={playSub}
				icon={<VideoControlPlayAndStop />}
				disabled={!areSubsAvailable}
				active={activeMode === 'sub'}
			/>*/}
			{/*<VideoControlButton onClick={toNextSub} icon={<VideoControlToRightIcon />} disabled={!areSubsAvailable} />*/}
		</div>
	)
}

export default VideoControls
