'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { LoadingSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/LoadingSmallButtonIcon'
import { PlaySmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/PlaySmallButtonIcon'
import { StopSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/StopSmallButtonIcon'
import { WarningSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/WarningSmallButtonIcon'
import { useDialogueAudioButton } from './fn/useDialogueAudioButton'

type DialogueAudioButtonProps = {
	address: DialogueAudioAddress
	colorScheme?: 'dark' | 'light'
}

export default function DialogueAudioButton({ address, colorScheme = 'dark' }: DialogueAudioButtonProps) {
	const audioButtonConfig = useDialogueAudioButton(address)
	if (!audioButtonConfig) return null

	return (
		<Button
			size='small'
			theme='outline'
			colorScheme={colorScheme}
			rounded
			onClick={audioButtonConfig.handleClick}
			disabled={audioButtonConfig.disabled}
			aria-label={audioButtonConfig.text}
			title={audioButtonConfig.text}
			aria-pressed={audioButtonConfig.playing}
			icon={
				audioButtonConfig.loading ? (
					<LoadingSmallButtonIcon />
				) : audioButtonConfig.playing ? (
					<StopSmallButtonIcon />
				) : audioButtonConfig.hasWarning ? (
					<WarningSmallButtonIcon />
				) : (
					<PlaySmallButtonIcon />
				)
			}
		>
			{audioButtonConfig.text}
		</Button>
	)
}
