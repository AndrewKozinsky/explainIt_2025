import { useMemo } from 'react'
import transcriptionService from '../../../../../../transcriptionService/transcriptionService'

export function useGetEngTranscription(engSentence: string) {
	return useMemo(function () {
		return transcriptionService.getTranscriptionBySentence(engSentence)
	}, [])
}
