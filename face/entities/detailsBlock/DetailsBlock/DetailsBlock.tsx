import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import VideoControls from '@/widgets/videoControls/VideoControls/VideoControls'
import './DetailsBlock.scss'

type DetailsBlockProps = {
	type: 'chapter' | 'video'
}

function DetailsBlock(props: DetailsBlockProps) {
	const { type } = props

	return (
		<ViewportSyncedHeight extraClass='details-block' gapTop={10} gapBottom={10}>
			<DetailsBlockWrapper />
			{type === 'video' && (
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
			)}
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
