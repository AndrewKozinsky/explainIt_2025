import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import './DetailsBlock.scss'

function DetailsBlock() {
	return (
		<ViewportSyncedHeight extraClass='details-block' gapTop={10} gapBottom={10}>
			<DetailsBlockWrapper />
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
