import { useCallback, useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { aiDialogueQueries, aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { getVisualsRefreshInterval, hasPendingDialogueVisuals } from './visualsRefreshPolicy'

export function useAiDialogueVisuals(dialogueId: number, enabled: boolean) {
	const queryClient = useQueryClient()
	const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const refreshVersion = useRef(0)
	const pendingSince = useRef<number | null>(null)
	const recoveredAssets = useRef(new Set<string>())
	const query = useQuery({
		...aiDialogueQueries.getVisuals(dialogueId),
		enabled,
		staleTime: 0,
		refetchOnMount: 'always',
		refetchOnWindowFocus: 'always',
		refetchOnReconnect: 'always',
		retry: 1,
		refetchIntervalInBackground: false,
		refetchInterval: function (currentQuery) {
			const now = Date.now()
			const visuals = currentQuery.state.data
			if (!hasPendingDialogueVisuals(visuals)) pendingSince.current = null
			else if (pendingSince.current === null) pendingSince.current = now
			return getVisualsRefreshInterval(
				visuals,
				pendingSince.current ?? now,
				now,
				Boolean(currentQuery.state.error),
			)
		},
	})

	// Replay, onopen and Redis can signal together. One trailing request covers the burst.
	const refreshVisuals = useCallback(
		function () {
			if (!enabled || refreshTimer.current !== null) return

			const version = refreshVersion.current

			refreshTimer.current = setTimeout(async function () {
				const queryKey = aiDialogueQueryKeys.visuals(dialogueId)
				// A signal during an older snapshot request still needs a fresh read after it.
				await queryClient
					.getQueryCache()
					.find({ queryKey, exact: true })
					?.promise?.catch(function () {})

				if (version !== refreshVersion.current) return

				refreshTimer.current = null
				void queryClient.invalidateQueries({ queryKey, exact: true }, { cancelRefetch: false })
			}, 250)
		},
		[dialogueId, enabled, queryClient],
	)

	const recoverImage = useCallback(
		function (assetKey: string) {
			// Signing does not check R2 existence. A missing object must not cause a refresh loop.
			if (recoveredAssets.current.has(assetKey)) return
			recoveredAssets.current.add(assetKey)
			refreshVisuals()
		},
		[refreshVisuals],
	)

	useEffect(
		function () {
			pendingSince.current = null
			recoveredAssets.current.clear()
			return function () {
				refreshVersion.current += 1
				if (refreshTimer.current !== null) clearTimeout(refreshTimer.current)
				refreshTimer.current = null
			}
		},
		[dialogueId, enabled],
	)

	return { visuals: query.data, refreshVisuals, recoverImage }
}
