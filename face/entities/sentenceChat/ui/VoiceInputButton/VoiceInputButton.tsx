import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { useUser } from '@/shared/api/auth/UserProvider'
import MicButtonIcon from '@/shared/ui/icons/buttonIcons/MicButtonIcon'
import StopRecordingButtonIcon from '@/shared/ui/icons/buttonIcons/StopRecordingButtonIcon'
import ChatRoundButton from '../ChatRoundButton/ChatRoundButton'
import { startRecognition, stopRecognition } from './fn/recognition'
import './VoiceInputButton.scss'

type VoiceInputButtonProps = {
	onInsert: (text: string) => void
}

function VoiceInputButton(props: VoiceInputButtonProps) {
	const { onInsert } = props
	const [state, setState] = useState<'idle' | 'recording' | 'thinking'>('idle')
	const recognitionRef = useRef<any>(null)
	const locale = useLocale()

	const user = useUser()
	const hasBalance = (user?.balance ?? 0) > 0
	const disabled = !hasBalance

	function start() {
		if (disabled) return
		startRecognition(recognitionRef, setState, onInsert, locale || 'ru')
	}

	function stop() {
		stopRecognition(recognitionRef, setState)
	}

	useEffect(() => {
		return () => {
			try {
				recognitionRef.current?.abort?.()
			} catch {}
		}
	}, [])

	const isRecording = state === 'recording'

	return (
		<ChatRoundButton
			icon={isRecording ? <StopRecordingButtonIcon /> : <MicButtonIcon />}
			disabled={disabled}
			onClick={isRecording ? stop : start}
			color={isRecording ? 'red' : undefined}
		/>
	)
}

export default VoiceInputButton
