import { useEffect, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { ProficiencyKey } from '../../VideosFilterForm/fn/proficiency'

function useProficiencyFilter() {
	const [proficiencyKey, setProficiencyKey] = useState<ProficiencyKey>(function () {
		return localStorageManager.lastProficiency.get() as ProficiencyKey
	})

	useEffect(
		function () {
			localStorageManager.lastProficiency.set(proficiencyKey)
		},
		[proficiencyKey],
	)

	return { proficiencyKey, setProficiencyKey }
}

export default useProficiencyFilter
