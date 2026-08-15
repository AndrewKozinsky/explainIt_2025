'use client'

import React, { useMemo } from 'react'
import type { YouTubeVideosFilterValues } from '@/widgets/video/VideosFilterForm/fn/types'
import YouTubeVideosFilterForm from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterForm'
import YouTubeVideosList from '@/widgets/video/YouTubeVideosList/YouTubeVideosList'
import useDurationFilter from './fn/useDurationFilter'
import { useGetSavedVideos } from './fn/useGetSavedVideos'
import useLanguageFilter from './fn/useLanguageFilter'
import useProficiencyFilter from './fn/useProficiencyFilter'
import useSortFilter from './fn/useSortFilter'
import useTopicFilter from './fn/useTopicFilter'
import './VideosCollection.scss'

function VideosCollection() {
	const { languageCode, setLanguageCode } = useLanguageFilter()
	const { durationKey, setDurationKey } = useDurationFilter()
	const { topicKey, topics, setTopicKey } = useTopicFilter()
	const { proficiencyKey, setProficiencyKey } = useProficiencyFilter()
	const { sortKey, setSortKey } = useSortFilter()

	const filterValues: YouTubeVideosFilterValues = useMemo(
		function () {
			return { languageCode, durationKey, topicKey, proficiencyKey, sortKey }
		},
		[languageCode, durationKey, topicKey, proficiencyKey, sortKey],
	)

	const { items, loading, errorText } = useGetSavedVideos(filterValues)

	function handleFilterChange(values: YouTubeVideosFilterValues) {
		setLanguageCode(values.languageCode)
		setDurationKey(values.durationKey)
		setTopicKey(values.topicKey)
		setProficiencyKey(values.proficiencyKey)
		setSortKey(values.sortKey)
	}

	return (
		<div className='videos-collection'>
			<YouTubeVideosFilterForm values={filterValues} topics={topics} onChange={handleFilterChange} />
			<YouTubeVideosList items={items} loading={loading} error={errorText} />
		</div>
	)
}

export default VideosCollection
