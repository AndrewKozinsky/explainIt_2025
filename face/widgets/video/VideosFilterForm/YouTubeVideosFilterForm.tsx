import React from 'react'
import VideosFilterSort from '@/widgets/video/VideosFilterForm/VideosFilterSort'
import YouTubeVideosFilterDuration from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterDuration'
import YouTubeVideosFilterLanguage from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterLanguage'
import YouTubeVideosFilterProficiency from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterProficiency'
import YouTubeVideosFilterTopic from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterTopic'
import type { YouTubeVideosFilterValues } from './fn/types'
import './YouTubeVideosFilterForm.scss'

type YouTubeVideosFilterFormProps = {
	values: YouTubeVideosFilterValues
	topics: string[]
	onChange: (values: YouTubeVideosFilterValues) => void
}

function YouTubeVideosFilterForm(props: YouTubeVideosFilterFormProps) {
	const { values, topics, onChange } = props

	return (
		<div className='youtube-videos-filter-form'>
			<YouTubeVideosFilterLanguage
				languageCode={values.languageCode}
				onChange={function (languageCode) {
					onChange({ ...values, languageCode })
				}}
			/>
			<YouTubeVideosFilterDuration
				durationKey={values.durationKey}
				onChange={function (durationKey) {
					onChange({ ...values, durationKey })
				}}
			/>
			<YouTubeVideosFilterProficiency
				proficiencyKey={values.proficiencyKey}
				onChange={function (proficiencyKey) {
					onChange({ ...values, proficiencyKey })
				}}
			/>
			<YouTubeVideosFilterTopic
				topicKey={values.topicKey}
				topics={topics}
				onChange={function (topicKey) {
					onChange({ ...values, topicKey })
				}}
			/>
			<VideosFilterSort
				sortKey={values.sortKey}
				onChange={function (sortKey) {
					onChange({ ...values, sortKey })
				}}
			/>
		</div>
	)
}

export default YouTubeVideosFilterForm
