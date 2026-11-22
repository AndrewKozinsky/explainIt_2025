import { useEffect, useRef, useState } from 'react'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'

export function useExamSubmission(dialogueId: number, onCheckingChange: (value: boolean) => void) {
	const [error, setError] = useState<string | null>(null)
	const [pending, setPending] = useState(false)
	const inFlight = useRef(false)
	const active = useRef(true)

	useEffect(() => {
		active.current = true
		return () => {
			active.current = false
		}
	}, [])
	async function submit() {
		if (inFlight.current) return
		inFlight.current = true
		setPending(true)
		onCheckingChange(true)
		setError(null)
		try {
			const message = await unwrapApiResult(aiDialogueService.checkExam(dialogueId))
			if (active.current) useAiDialogueStore.getState().upsertMessage(message)
		} catch (error) {
			if (active.current) setError(error instanceof Error ? error.message : '')
		} finally {
			inFlight.current = false
			if (active.current) {
				setPending(false)
				onCheckingChange(false)
			}
		}
	}
	return { pending, error, submit }
}
