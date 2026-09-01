import React, { useMemo } from 'react'
import Switcher, { type SwitcherItem } from '@/shared/ui/Switcher/Switcher'
import { PROFICIENCY_OPTIONS, ProficiencyKey } from './fn/proficiency'

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
