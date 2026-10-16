'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { useDialogueAudioButton } from './fn/useDialogueAudioButton'
import './DialogueAudioButton.scss'

export default function DialogueAudioButton({ address }: { address: DialogueAudioAddress }) {
	const button = useDialogueAudioButton(address)
	if (!button) return null

	return (
		<button
			type='button'
			className={`dialogue-audio-button${button.playing ? ' dialogue-audio-button--playing' : ''}`}
			onClick={button.handleClick}
			disabled={button.disabled}
			aria-label={button.label}
			title={button.label}
			aria-pressed={button.playing}
		>
			{button.loading ? (
				<span className='dialogue-audio-button__spinner' aria-hidden='true' />
			) : (
				<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true' focusable='false'>
					<path d={button.iconPath} />
				</svg>
			)}
		</button>
	)
}
