// 'use client'

// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import type { VideoLiteModel } from '@/entities/video/lib/types'
// import { YoutubeApi } from '@/entities/youtube/repository/YoutubeApi'
// import YouTubeVideosCenterWrapper from '@/entities/youtube/ui/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
// import YouTubeVideosList, { type YouTubeVideoCardData } from '@/entities/youtube/ui/YouTubeVideosList/YouTubeVideosList'
// import { YoutubeService } from '@/entities/youtube/YoutubeService'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import Select from '@/shared/ui/formRelated/Select/Select'
// import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
// import Spinner from '@/shared/ui/Spinner/Spinner'
// import Switcher from '@/shared/ui/Switcher/Switcher'
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

/*function YouTubeVideosSaved() {
	const youtubeService = useMemo(function () {
		return new YoutubeService(new YoutubeApi())
	}, [])

	const [loading, setLoading] = useState(true)
	const [videos, setVideos] = useState<VideoLiteModel[]>([])
	const [error, setError] = useState<null | string>(null)
	const [durationKey, setDurationKey] = useState<DurationKey>('')
	const [proficiencyKey, setProficiencyKey] = useState<ProficiencyKey>('')
	const [topicKey, setTopicKey] = useState('')
	const [topics, setTopics] = useState<string[]>([])
	const [languageCode, setLanguageCode] = useState<LanguageCode | undefined>(undefined)

	const fetchSavedVideos = useCallback(
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
	)

	useEffect(
		function () {
			void fetchSavedVideos()
		},
		[fetchSavedVideos],
	)

	useEffect(
		function () {
			void youtubeService.getVideoTopics().then(function (result) {
				if (!result.error && !result.errors) {
					setTopics(result.data)
				}
			})
		},
		[youtubeService],
	)

	const durationItems = getDurationSwitcherItems(durationKey, setDurationKey)
	const proficiencyItems = getProficiencySwitcherItems(proficiencyKey, setProficiencyKey)

	const topicOptions = [
		{ value: '', label: 'Любая' },
		...topics.map(function (topic) {
			return { value: topic, label: topic }
		}),
	]

	return (
		<div className='youtube-videos-saved'>
			<div className='youtube-videos-saved__filters'>
				<Switcher type='fit' orientation='horizontal' items={durationItems} />
				<Switcher type='fit' orientation='horizontal' items={proficiencyItems} />
				<Select
					options={topicOptions}
					selectProps={{
						value: topicKey,
						onChange: function (e) {
							setTopicKey(e.target.value)
						},
					}}
				/>
				<LanguageSwitch
					languages={languageKeys}
					currentLang={languageCode as LanguageCode}
					onChange={function (lang) {
						setLanguageCode(lang === languageCode ? undefined : lang)
					}}
				/>
			</div>

			{loading && (
				<YouTubeVideosCenterWrapper>
					<Spinner size='small' />
				</YouTubeVideosCenterWrapper>
			)}

			{!loading && error && (
				<YouTubeVideosCenterWrapper>
					<ErrorMessage text={error} />
				</YouTubeVideosCenterWrapper>
			)}

			{!loading && !error && videos.length === 0 && (
				<YouTubeVideosCenterWrapper>
					<ErrorMessage text='Нет видео по заданным критериям' />
				</YouTubeVideosCenterWrapper>
			)}

			{!loading && !error && videos.length > 0 && <YouTubeVideosList items={mapToYouTubeVideoCardData(videos)} />}
		</div>
	)
}*/

// export default YouTubeVideosSaved

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
