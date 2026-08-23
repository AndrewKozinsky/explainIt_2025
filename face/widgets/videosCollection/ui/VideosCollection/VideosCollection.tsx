'use client'

import { YouTubeVideosFilterValues } from '../VideosFilterForm/fn/types'
import YouTubeVideosFilterForm from '../VideosFilterForm/YouTubeVideosFilterForm'
import YouTubeVideosList from '../YouTubeVideosList/YouTubeVideosList'
import useDurationFilter from './fn/useDurationFilter'
import { useGetSavedVideos } from './fn/useGetSavedVideos'
import useLanguageFilter from './fn/useLanguageFilter'
import useProficiencyFilter from './fn/useProficiencyFilter'
import useSortFilter from './fn/useSortFilter'
import useTopicFilter from './fn/useTopicFilter'
import './VideosCollection.scss'

type VideosCollectionProps = {
	// Подгружать ли следующие страницы при прокрутке списка
	withInfiniteScroll?: boolean
}

function VideosCollection(props: VideosCollectionProps) {
	const { withInfiniteScroll = true } = props

	const { languageCode, setLanguageCode } = useLanguageFilter()
	const { durationKey, setDurationKey } = useDurationFilter()
	const { topicKey, topics, setTopicKey } = useTopicFilter()
	const { proficiencyKey, setProficiencyKey } = useProficiencyFilter()
	const { sortKey, setSortKey } = useSortFilter()

	const filterValues: YouTubeVideosFilterValues = { languageCode, durationKey, topicKey, proficiencyKey, sortKey }

	function handleFilterChange(values: YouTubeVideosFilterValues) {
		setLanguageCode(values.languageCode)
		setDurationKey(values.durationKey)
		setTopicKey(values.topicKey)
		setProficiencyKey(values.proficiencyKey)
		setSortKey(values.sortKey)
	}

	const { items, loading, loadingMore, hasMore, loadMore, errorText } = useGetSavedVideos(filterValues)

	return (
		<div className='videos-collection'>
			<YouTubeVideosFilterForm values={filterValues} topics={topics} onChange={handleFilterChange} />
			<YouTubeVideosList
				items={items}
				loading={loading}
				loadingMore={loadingMore}
				hasMore={hasMore}
				onLoadMore={withInfiniteScroll ? loadMore : undefined}
				error={errorText}
			/>
		</div>
	)
}

export default VideosCollection
