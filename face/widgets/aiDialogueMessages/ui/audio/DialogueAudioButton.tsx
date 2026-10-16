'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { useDialogueAudioButton } from './fn/useDialogueAudioButton'
import './DialogueAudioButton.scss'

export default function DialogueAudioButton({ address }: { address: DialogueAudioAddress }) {
	const button = useDialogueAudioButton(address)
	if (!button) return null

	return (
		<Button
			size='small'
			theme='plain'
			extraClass={`dialogue-audio-button${button.playing ? ' dialogue-audio-button--playing' : ''}`}
			onClick={button.handleClick}
			disabled={button.disabled}
			aria-label={button.label}
			title={button.label}
			aria-pressed={button.playing}
			icon={
				button.loading ? (
					<span className='dialogue-audio-button__spinner' aria-hidden='true' />
				) : (
					<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true' focusable='false'>
						<path d={button.iconPath} />
					</svg>
				)
			}
		/>
	)
}
