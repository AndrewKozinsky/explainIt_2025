// import { useEffect, useRef, useState } from 'react'
// import cn from 'classnames'
// import { getCurrentUserLanguageCode } from '@/utils/currentUserLanguage'
// import { startRecognition, stopRecognition } from './fn/recognition'
// import './VoiceInputButton.scss'

/*type VoiceInputButtonProps = {
	onInsert: (text: string) => void
	disabled?: boolean
	className?: string
}*/

/*function VoiceInputButton(props: VoiceInputButtonProps) {
	const { onInsert, disabled, className } = props
	const [state, setState] = useState<'idle' | 'recording' | 'thinking'>('idle')
	const recognitionRef = useRef<any>(null)

	function start() {
		if (disabled) return
		startRecognition(recognitionRef, setState, onInsert, getCurrentUserLanguageCode() || 'ru')
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
		<button
			type='button'
			className={cn('chat-input__mic-button', className, state)}
			disabled={!!disabled}
			onClick={isRecording ? stop : start}
			title={isRecording ? 'Остановить запись' : 'Надиктовать'}
		>
			{isRecording ? '■' : '🎤'}
		</button>
	)
}*/

// export default VoiceInputButton
