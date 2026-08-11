import { useState } from 'react'
import type { ProficiencyKey } from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterProficiency'

function useProficiencyFilter() {
	const [proficiencyKey, setProficiencyKey] = useState<ProficiencyKey>('')

	return { proficiencyKey, setProficiencyKey }
}

export default useProficiencyFilter
