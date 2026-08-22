'use client'

import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { useVideoControls } from '@/widgets/videoControls/VideoControls/fn/useVideoControls'
import VideoControls from '@/widgets/videoControls/VideoControls/VideoControls'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import './DetailsBlock.scss'

type DetailsBlockProps = {
	type: 'chapter' | 'video'
}

function DetailsBlock(props: DetailsBlockProps) {
	const { type } = props

	const videoControls = useVideoControls()

	return (
		<ViewportSyncedHeight extraClass='details-block' gapTop={10} gapBottom={10}>
			<DetailsBlockWrapper />
			{type === 'video' && (
				<VideoControls
					toVideoStart={videoControls.toVideoStart}
					playVideo={videoControls.playVideo}
					playVideoShadowing={videoControls.playVideoShadowing}
					toPrevSub={videoControls.toPrevSub}
					playSubAndRevert={videoControls.playSubAndRevert}
					playSub={videoControls.playSub}
					toNextSub={videoControls.toNextSub}
					areSubsAvailable={videoControls.areSubsAvailable}
					activeMode={videoControls.activeMode}
				/>
			)}
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
