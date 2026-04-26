import cn from 'classnames'
import ViewportSyncedHeight from 'ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import { useClearDataOnUnmount } from './fn/clearDataOnUnmount'
import { useFetchCurrentPhraseTranslation } from './fn/fetchPhraseTranslation'
import { useFetchCurrentSentenceTranslation } from './fn/fetchSentenceTranslation'
import { useInitStore } from './fn/initStore'
import { usePopulateStoreWithBookData, usePopulateStoreWithMovieData } from './fn/populateStore'
import './DetailsBlock.scss'

type DetailsBlockProps = {
	mediaType: 'reading' | 'watching'
}

function DetailsBlock(props: DetailsBlockProps) {
	const { mediaType } = props

	useInitStore()
	usePopulateStoreWithBookData()
	usePopulateStoreWithMovieData()
	useFetchCurrentSentenceTranslation()
	useFetchCurrentPhraseTranslation()
	useClearDataOnUnmount()

	return (
		<ViewportSyncedHeight extraClass={cn('details-block', 'details-block--' + mediaType)}>
			<DetailsBlockWrapper mediaType={mediaType} />
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
