'use client'

import React, { useMemo } from 'react'
import type { YouTubeVideosFilterValues } from '@/widgets/video/YouTubeVideosFilterForm/fn/types'
import YouTubeVideosFilterForm from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterForm'
import YouTubeVideosList from '@/widgets/video/YouTubeVideosList/YouTubeVideosList'
import useDurationFilter from './fn/useDurationFilter'
import { useGetSavedVideos } from './fn/useGetSavedVideos'
import useLanguageFilter from './fn/useLanguageFilter'
import useProficiencyFilter from './fn/useProficiencyFilter'
import useTopicFilter from './fn/useTopicFilter'
import './VideosCollection.scss'

function VideosCollection() {
	const { languageCode, setLanguageCode } = useLanguageFilter()
	const { durationKey, setDurationKey } = useDurationFilter()
	const { topicKey, topics, setTopicKey } = useTopicFilter()
	const { proficiencyKey, setProficiencyKey } = useProficiencyFilter()

	const filterValues: YouTubeVideosFilterValues = useMemo(
		function () {
			return { languageCode, durationKey, topicKey, proficiencyKey }
		},
		[languageCode, durationKey, topicKey, proficiencyKey],
	)

	const { items, loading, errorText } = useGetSavedVideos(filterValues)

	function handleFilterChange(values: YouTubeVideosFilterValues) {
		setLanguageCode(values.languageCode)
		setDurationKey(values.durationKey)
		setTopicKey(values.topicKey)
		setProficiencyKey(values.proficiencyKey)
	}

	return (
		<div className='videos-collection'>
			<YouTubeVideosFilterForm values={filterValues} topics={topics} onChange={handleFilterChange} />
			<YouTubeVideosList items={items} loading={loading} error={errorText} />
		</div>
	)
}

export default VideosCollection
