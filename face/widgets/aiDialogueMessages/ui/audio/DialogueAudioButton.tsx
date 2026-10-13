'use client'

import type { MouseEvent } from 'react'
import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { useDialogueAudio } from './DialogueAudioContext'
import './DialogueAudioButton.scss'

export default function DialogueAudioButton({ address }: { address: DialogueAudioAddress }) {
	const audio = useDialogueAudio()
	if (!audio) return null

	const item = audio.player.findItem(address)
	const selected = item?.id === audio.state.selectedId
	const playing = selected && (audio.state.playbackStatus === 'playing' || audio.state.playbackStatus === 'loading')
	const failed = Boolean(item && ['failed', 'outcomeUnknown', 'cancelled'].includes(item.status))
	const waiting = !item || item.status === 'queued' || item.status === 'generating'
	const loading = waiting || (selected && audio.state.playbackStatus === 'loading')
	const downloadError = Boolean(item && audio.state.loadErrors.has(item.id))
	const paused = selected && audio.state.playbackStatus === 'paused'
	const label = getLabel(failed, waiting, playing, downloadError, paused)

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		if (item) audio?.player.toggle(item.id)
	}

	return (
		<button
			type='button'
			className={`dialogue-audio-button${playing ? ' dialogue-audio-button--playing' : ''}`}
			onClick={handleClick}
			disabled={Boolean(failed || waiting || !item?.url)}
			aria-label={label}
			title={label}
			aria-pressed={Boolean(playing)}
		>
			{loading ? (
				<span className='dialogue-audio-button__spinner' aria-hidden='true' />
			) : (
				<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true' focusable='false'>
					<path d={getIconPath(failed, playing, downloadError)} />
				</svg>
			)}
		</button>
	)
}

function getLabel(failed: boolean, waiting: boolean, playing: boolean, error: boolean, paused: boolean) {
	if (failed) return 'Озвучка недоступна'
	if (waiting) return 'Озвучка готовится'
	if (playing) return 'Остановить воспроизведение'
	if (error) return 'Повторить загрузку и воспроизведение'
	if (paused) return 'Продолжить воспроизведение'
	return 'Воспроизвести озвучку'
}

function getIconPath(failed: boolean, playing: boolean, error: boolean) {
	if (failed) return 'M12 4 2 21h20L12 4Zm-1 6h2v5h-2v-5Zm0 7h2v2h-2v-2Z'
	if (playing) return 'M6 6h12v12H6z'
	if (error) return 'M18 6a8 8 0 1 0 2 8h-2a6 6 0 1 1-1.4-6.6L13 11h8V3l-3 3Z'
	return 'm8 5 11 7-11 7V5Z'
}
