import React from 'react'
import YouTubeVideosFilterDuration from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterDuration'
import YouTubeVideosFilterLanguage from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterLanguage'
import type { YouTubeVideosFilterValues } from './fn/types'
import './YouTubeVideosFilterForm.scss'

type YouTubeVideosFilterFormProps = {
	values: YouTubeVideosFilterValues
	onChange: (values: YouTubeVideosFilterValues) => void
}

function YouTubeVideosFilterForm(props: YouTubeVideosFilterFormProps) {
	const { values, onChange } = props

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
		</div>
	)
}

export default YouTubeVideosFilterForm
