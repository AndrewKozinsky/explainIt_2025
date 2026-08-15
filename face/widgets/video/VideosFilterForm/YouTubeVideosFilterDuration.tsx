import React from 'react'
import Select, { type DropdownOption } from '@/shared/ui/formRelated/Select/Select'

export type DurationKey = '' | '0-5' | '5-15' | '15-30' | '30-60'

const DURATION_OPTIONS: DropdownOption[] = [
	{ value: '', label: 'Любая' },
	{ value: '0-5', label: '0-5 мин.' },
	{ value: '5-15', label: '5-15 мин.' },
	{ value: '15-30', label: '15-30 мин.' },
	{ value: '30-60', label: '30-60 мин.' },
]

type YouTubeVideosFilterDurationProps = {
	durationKey: DurationKey
	onChange: (durationKey: DurationKey) => void
}

function YouTubeVideosFilterDuration(props: YouTubeVideosFilterDurationProps) {
	const { durationKey, onChange } = props

	return (
		<Select
			label='Длительность'
			options={DURATION_OPTIONS}
			selectProps={{
				value: durationKey,
				onChange: function (e) {
					onChange(e.target.value as DurationKey)
				},
			}}
		/>
	)
}

export default YouTubeVideosFilterDuration
