import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { useUserStore } from 'stores/userStore'
import MicButtonIcon from 'ui/icons/buttonIcons/MicButtonIcon'
import StopRecordingButtonIcon from 'ui/icons/buttonIcons/StopRecordingButtonIcon'
import ChatRoundButton from '_pages/media/sentenceChat/ChatRoundButton/ChatRoundButton'
import { startRecognition, stopRecognition } from './fn/recognition'
import './VoiceInputButton.scss'

type VoiceInputButtonProps = {
	onInsert: (text: string) => void
	className?: string
}

function VoiceInputButton(props: VoiceInputButtonProps) {
	const { onInsert, className } = props
	const [state, setState] = useState<'idle' | 'recording' | 'thinking'>('idle')
	const recognitionRef = useRef<any>(null)
	const locale = useLocale()

	const user = useUserStore((s) => s.user)
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
	/*return (
		<button
			type='button'
			className={cn('chat-input__mic-button', className, state)}
			disabled={!!disabled}
			onClick={isRecording ? stop : start}
			title={isRecording ? 'Остановить запись' : 'Надиктовать'}
		>
			{isRecording ? '■' : '🎤'}
		</button>
	)*/
}

export default VoiceInputButton
