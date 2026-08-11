import React from 'react'
import Select, { type DropdownOption } from '@/shared/ui/formRelated/Select/Select'

export type ProficiencyKey = '' | '1' | '2' | '3' | '4' | '5' | '6'

const PROFICIENCY_OPTIONS: DropdownOption[] = [
	{ value: '', label: 'Любой' },
	{ value: '1', label: 'A1' },
	{ value: '2', label: 'A2' },
	{ value: '3', label: 'B1' },
	{ value: '4', label: 'B2' },
	{ value: '5', label: 'C1' },
	{ value: '6', label: 'C2' },
]

type YouTubeVideosFilterProficiencyProps = {
	proficiencyKey: ProficiencyKey
	onChange: (proficiencyKey: ProficiencyKey) => void
}

function YouTubeVideosFilterProficiency(props: YouTubeVideosFilterProficiencyProps) {
	const { proficiencyKey, onChange } = props

	return (
		<Select
			label='Уровень'
			options={PROFICIENCY_OPTIONS}
			selectProps={{
				value: proficiencyKey,
				onChange: function (e) {
					onChange(e.target.value as ProficiencyKey)
				},
			}}
		/>
	)
}

export default YouTubeVideosFilterProficiency
