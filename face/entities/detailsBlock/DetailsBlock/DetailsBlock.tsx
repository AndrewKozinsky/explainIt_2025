import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import VideoControls from '@/widgets/videoControls/VideoControls/VideoControls'
import './DetailsBlock.scss'

function DetailsBlock() {
	return (
		<ViewportSyncedHeight extraClass='details-block' gapTop={10} gapBottom={10}>
			<DetailsBlockWrapper />
			<VideoControls
				toVideoStart={() => {}}
				playVideo={() => {}}
				playVideoShadowing={() => {}}
				toPrevSub={() => {}}
				playSubAndRevert={() => {}}
				playSub={() => {}}
				toNextSub={() => {}}
				areSubsAvailable={false}
			/>
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
