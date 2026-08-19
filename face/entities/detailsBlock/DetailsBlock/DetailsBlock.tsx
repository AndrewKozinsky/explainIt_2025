import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import './DetailsBlock.scss'

function DetailsBlock() {
	return (
		<ViewportSyncedHeight extraClass='details-block'>
			<DetailsBlockWrapper />
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
