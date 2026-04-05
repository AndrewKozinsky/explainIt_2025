import cn from 'classnames'
import ViewportSyncedHeight from 'ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '_pages/media/detailsBlock/ViewRouter/DetailsBlockWrapper'
import { useGetAnalysis } from './fn/getAnalysis'
import { useClearDataOnUnmount, usePopulateStore } from './fn/populateStore'
import './DetailsBlock.scss'

type DetailsBlockProps = {
	mediaType: 'reading' | 'watching'
}

function DetailsBlock(props: DetailsBlockProps) {
	const { mediaType } = props

	usePopulateStore()
	useGetAnalysis()
	useClearDataOnUnmount()

	return (
		<ViewportSyncedHeight extraClass={cn('details-block', 'details-block--' + mediaType)}>
			<DetailsBlockWrapper mediaType={mediaType} />
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
