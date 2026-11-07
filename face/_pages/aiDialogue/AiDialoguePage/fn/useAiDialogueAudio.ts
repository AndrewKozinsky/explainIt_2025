import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { DialogueAudioPlayer } from '@/entities/aiDialogue/audio/DialogueAudioPlayer'
import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getVoicedAudioAddresses } from '@/entities/aiDialogue/audio/getVoicedAudioAddresses'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { DialogueAudioStreamHandlers } from './openAiDialogueStream'

/** Проигрыватель озвучки страницы диалога: файлы запрашиваются у сервера по нажатию или автоозвучкой. */
export function useAiDialogueAudio(dialogueId: number) {
	const player = useMemo(
		function () {
			return new DialogueAudioPlayer(
				function (address: DialogueAudioAddress) {
					return unwrapApiResult(aiDialogueService.getAudio(dialogueId, address))
				},
				function () {
					return new Audio()
				},
			)
		},
		[dialogueId],
	)

	const subscribe = useCallback(
		function (listener: () => void) {
			return player.subscribe(listener)
		},
		[player],
	)

	const getState = useCallback(
		function () {
			return player.getState()
		},
		[player],
	)

	const state = useSyncExternalStore(subscribe, getState, getState)

	useEffect(
		function () {
			return function () {
				player.dispose()
			}
		},
		[player],
	)

	const handlers: DialogueAudioStreamHandlers = useMemo(
		function () {
			return {
				newMessage: function (message: DialogueServerMessage, isNewReply: boolean) {
					const addresses = getVoicedAudioAddresses(message)
					if (addresses.length === 0) return false

					player.enqueueAutoplay(addresses, isNewReply)
					return true
				},
				disconnect: function () {
					player.disconnect()
				},
			}
		},
		[player],
	)

	return { player, state, handlers }
}
