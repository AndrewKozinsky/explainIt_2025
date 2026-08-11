import React from 'react'
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
		</div>
	)
}

export default YouTubeVideosFilterForm
