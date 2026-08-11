import React from 'react'
import Select, { type DropdownOption } from '@/shared/ui/formRelated/Select/Select'

type YouTubeVideosFilterTopicProps = {
	topicKey: string
	topics: string[]
	onChange: (topicKey: string) => void
}

function YouTubeVideosFilterTopic(props: YouTubeVideosFilterTopicProps) {
	const { topicKey, topics, onChange } = props

	const options: DropdownOption[] = [
		{ value: '', label: 'Любая' },
		...topics.map(function (topic) {
			return { value: topic, label: topic }
		}),
	]

	return (
		<Select
			label='Тема'
			options={options}
			selectProps={{
				value: topicKey,
				onChange: function (e) {
					onChange(e.target.value)
				},
			}}
		/>
	)
}

export default YouTubeVideosFilterTopic
