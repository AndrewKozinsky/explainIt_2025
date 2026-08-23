import Select from '@/shared/ui/formRelated/Select/Select'
import { DURATION_OPTIONS, DurationKey } from './fn/duration'

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
