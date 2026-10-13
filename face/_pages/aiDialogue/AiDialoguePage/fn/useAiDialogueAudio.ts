import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { aiDialogueQueries, aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { DialogueAudioPlayer } from '@/entities/aiDialogue/audio/DialogueAudioPlayer'
import type { DialogueAudioEvent } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
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
			if (!snapshot || current.state.error) return 5000
			if (
				snapshot.attempts.some(function (attempt) {
					return attempt.status === 'active'
				})
			)
				return 2000
			if (
				snapshot.items.some(function (item) {
					return item.status === 'queued' || item.status === 'generating'
				})
			)
				return 2000
			const dates = snapshot.items
				.map(function (item) {
					return Date.parse(item.urlsExpireAt ?? '')
				})
				.filter(Number.isFinite)
			return dates.length ? Math.max(1000, Math.min(...dates) - Date.now() - 60_000) : false
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

	const handlers: DialogueAudioStreamHandlers = useMemo(
		function () {
			return {
				event: function (event: DialogueAudioEvent) {
					if (event.type === 'audioAttemptStarted') player.startAttempt(event.attemptId, event.turnId)
					else if (event.type === 'audioAttemptCancelled') player.cancelAttempt(event.attemptId)
					else if (event.type === 'audioReady') player.mergeItem(event.audio)
					else refresh()
				},
				targets: function (attemptId, targets) {
					player.registerTargets(attemptId, targets)
				},
				refresh,
				disconnect: function () {
					player.disconnect()
				},
			}
		},
		[player, refresh],
	)

	return { player, state, handlers }
}
