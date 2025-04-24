'use client'

import { useAiCheckTranslation } from '../../../graphql'

export function Test() {
	const { loading, data, error } = useAiCheckTranslation({
		variables: {
			rusSentence: 'My rus sentence',
			engSentence: 'My eng sentence',
		},
	})

	console.log(data)

	return null
}
