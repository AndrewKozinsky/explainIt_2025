import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { aiDialogueQueries, aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { DialogueAudioPlayer } from '@/entities/aiDialogue/audio/DialogueAudioPlayer'
import type { DialogueAudioEvent } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getAudioRefreshInterval, hasPendingDialogueAudio } from './audioRefreshPolicy'
import type { DialogueAudioStreamHandlers } from './openAiDialogueStream'

/** REST repairs missed SSE notifications; a ready SSE item is playable without waiting for REST. */
export function useAiDialogueAudio(dialogueId: number, enabled: boolean) {
	const queryClient = useQueryClient()

	const player = useMemo(
		function () {
			return new DialogueAudioPlayer(
				function () {
					return new Audio()
				},
				undefined,
				dialogueId,
			)
		},
		[dialogueId],
	)

	const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const epoch = useRef(0)
	const pendingSince = useRef<number | null>(null)

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

	const query = useQuery({
		...aiDialogueQueries.getAudio(dialogueId),
		enabled,
		staleTime: 0,
		refetchOnMount: 'always',
		refetchOnWindowFocus: 'always',
		refetchOnReconnect: 'always',
		retry: 1,
		refetchIntervalInBackground: false,
		refetchInterval: function (current) {
			const snapshot = current.state.data
			const now = Date.now()
			const pending = hasPendingDialogueAudio(snapshot) || !snapshot || Boolean(current.state.error)
			if (!pending) pendingSince.current = null
			else if (pendingSince.current === null) pendingSince.current = now
			return getAudioRefreshInterval(snapshot, pendingSince.current ?? now, now, Boolean(current.state.error))
		},
	})

	const refresh = useCallback(
		function () {
			if (!enabled || refreshTimer.current !== null) return
			const version = epoch.current
			refreshTimer.current = setTimeout(async function () {
				const queryKey = aiDialogueQueryKeys.audio(dialogueId)
				await queryClient
					.getQueryCache()
					.find({ queryKey, exact: true })
					?.promise?.catch(function () {})
				if (version !== epoch.current) return

				refreshTimer.current = null
				void queryClient.invalidateQueries({ queryKey, exact: true }, { cancelRefetch: false })
			}, 100)
		},
		[dialogueId, enabled, queryClient],
	)

	useEffect(
		function () {
			player.setRefresh(async function () {
				const snapshot = await queryClient.fetchQuery({
					...aiDialogueQueries.getAudio(dialogueId),
					staleTime: 0,
				})
				player.mergeSnapshot(snapshot)
			})
			return function () {
				epoch.current += 1
				pendingSince.current = null
				if (refreshTimer.current !== null) clearTimeout(refreshTimer.current)
				refreshTimer.current = null
				player.dispose()
			}
		},
		[player, refresh, queryClient, dialogueId],
	)

	useEffect(
		function () {
			if (query.data) player.mergeSnapshot(query.data)
		},
		[player, query.data],
	)

	const handleAudioEvent = useCallback(
		function (event: DialogueAudioEvent) {
			if (event.type === 'audioAttemptStarted') {
				pendingSince.current = Date.now()
				player.startAttempt(event.attemptId, event.turnId)
			} else if (event.type === 'audioAttemptCancelled') player.cancelAttempt(event.attemptId)
			else if (event.type === 'audioReady') player.mergeItem(event.audio)
			else {
				if (event.type === 'audioQueued') pendingSince.current = Date.now()
				refresh()
			}
		},
		[player, refresh],
	)

	const handlers: DialogueAudioStreamHandlers = useMemo(
		function () {
			return {
				event: handleAudioEvent,
				targets: function (attemptId, targets) {
					player.registerTargets(attemptId, targets)
				},
				refresh,
				disconnect: function () {
					player.disconnect()
				},
			}
		},
		[player, refresh, handleAudioEvent],
	)

	return { player, state, handlers }
}
