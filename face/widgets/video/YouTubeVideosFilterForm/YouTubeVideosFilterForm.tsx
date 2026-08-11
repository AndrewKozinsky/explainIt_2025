import React from 'react'
import YouTubeVideosFilterDuration from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterDuration'
import YouTubeVideosFilterLanguage from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterLanguage'
import YouTubeVideosFilterProficiency from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterProficiency'
import YouTubeVideosFilterTopic from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterTopic'
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
			<YouTubeVideosFilterTopic
				topicKey={values.topicKey}
				topics={topics}
				onChange={function (topicKey) {
					onChange({ ...values, topicKey })
				}}
			/>
			<YouTubeVideosFilterProficiency
				proficiencyKey={values.proficiencyKey}
				onChange={function (proficiencyKey) {
					onChange({ ...values, proficiencyKey })
				}}
			/>
		</div>
	)
}

export default YouTubeVideosFilterForm
