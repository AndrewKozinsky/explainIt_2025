'use client'

import React, { useMemo } from 'react'
// import { useCallback, useEffect, useMemo } from 'react'
// import type { VideoLiteModel } from '@/entities/video/lib/types'
// import { YoutubeApi } from '@/entities/youtube/repository/YoutubeApi'
// import YouTubeVideosCenterWrapper from '@/entities/youtube/ui/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
// import YouTubeVideosList, { type YouTubeVideoCardData } from '@/entities/youtube/ui/YouTubeVideosList/YouTubeVideosList'
// import { YoutubeService } from '@/entities/youtube/YoutubeService'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import Spinner from '@/shared/ui/Spinner/Spinner'
// import { type LanguageCode, languageKeys } from '@/shared/utils/languages'
// import { pageUrls } from '@/shared/utils/pageUrls'
// import {
// 	type DurationKey,
// 	getDurationFilter,
// 	getDurationSwitcherItems,
// 	type ProficiencyKey,
// 	getProficiencyFilter,
// 	getProficiencySwitcherItems,
// } from './fn/getFilterConfig'
// import './YouTubeVideosSaved.scss'
import type { YouTubeVideosFilterValues } from '@/widgets/video/YouTubeVideosFilterForm/fn/types'
import YouTubeVideosFilterForm from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterForm'
import YouTubeVideosList from '@/widgets/video/YouTubeVideosList/YouTubeVideosList'
import useDurationFilter from './fn/useDurationFilter'
import useLanguageFilter from './fn/useLanguageFilter'
import useProficiencyFilter from './fn/useProficiencyFilter'
import useTopicFilter from './fn/useTopicFilter'

function YouTubeVideosSaved() {
	// const [loading, setLoading] = useState(true)
	// const [videos, setVideos] = useState<VideoLiteModel[]>([])
	// const [error, setError] = useState<null | string>(null)
	// const [durationKey, setDurationKey] = useState<DurationKey>('')
	// const [proficiencyKey, setProficiencyKey] = useState<ProficiencyKey>('')
	// const [topicKey, setTopicKey] = useState('')
	// const [topics, setTopics] = useState<string[]>([])
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

	function handleFilterChange(values: YouTubeVideosFilterValues) {
		setLanguageCode(values.languageCode)
		setDurationKey(values.durationKey)
		setTopicKey(values.topicKey)
		setProficiencyKey(values.proficiencyKey)
	}

	/*const fetchSavedVideos = useCallback(
		async function () {
			setLoading(true)
			setError(null)

			const durationFilter = getDurationFilter(durationKey)
			const proficiencyFilter = getProficiencyFilter(proficiencyKey)

			const result = await youtubeService.getSavedVideos({
				...durationFilter,
				...proficiencyFilter,
				topic: topicKey || undefined,
				languageCode,
			})

			if (result.error || result.errors) {
				setError(result.error ?? 'Неизвестная ошибка')
				setLoading(false)
				return
			}

			setVideos(result.data)
			setLoading(false)
		},
		[youtubeService, durationKey, proficiencyKey, topicKey, languageCode],
	)*/
	/*useEffect(
		function () {
			void fetchSavedVideos()
		},
		[fetchSavedVideos],
	)*/
	/*useEffect(
		function () {
			void youtubeService.getVideoTopics().then(function (result) {
				if (!result.error && !result.errors) {
					setTopics(result.data)
				}
			})
		},
		[youtubeService],
	)*/
	// const durationItems = getDurationSwitcherItems(durationKey, setDurationKey)
	// const proficiencyItems = getProficiencySwitcherItems(proficiencyKey, setProficiencyKey)
	/*const topicOptions = [
		{ value: '', label: 'Любая' },
		...topics.map(function (topic) {
			return { value: topic, label: topic }
		}),
	]*/

	return (
		<div>
			<YouTubeVideosFilterForm values={filterValues} topics={topics} onChange={handleFilterChange} />
			<YouTubeVideosList items={mapToYouTubeVideoCardData(videos)} />
		</div>
	)
}

export default YouTubeVideosSaved

/*function mapToYouTubeVideoCardData(videos: VideoLiteModel[]): YouTubeVideoCardData[] {
	return videos.map(function (video) {
		return {
			id: video.id,
			name: video.name,
			duration: video.duration,
			coverUrl: video.coverUrl,
			url: pageUrls.youtube.video(video.youtubeVideoId!).path,
			proficiencyLevel: video.proficiencyLevel,
		}
	})
}*/
