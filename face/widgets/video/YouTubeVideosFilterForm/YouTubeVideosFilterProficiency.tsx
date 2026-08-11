import React, { useMemo } from 'react'
import Switcher, { type SwitcherItem } from '@/shared/ui/Switcher/Switcher'

export type ProficiencyKey = '' | '1' | '2' | '3' | '4' | '5' | '6'

const PROFICIENCY_OPTIONS: { value: ProficiencyKey; label: string }[] = [
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

	const items: SwitcherItem[] = useMemo(
		function () {
			return PROFICIENCY_OPTIONS.map(function (option) {
				return {
					text: option.label,
					onClick: function () {
						onChange(option.value)
					},
					isCurrent: proficiencyKey === option.value,
				}
			})
		},
		[proficiencyKey, onChange],
	)

	return <Switcher label='Уровень' type='fit' orientation='horizontal' items={items} />
}

export default YouTubeVideosFilterProficiency
