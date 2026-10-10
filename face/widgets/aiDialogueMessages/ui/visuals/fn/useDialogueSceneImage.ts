import { useCallback, useEffect, useRef, useState } from 'react'
import { useDialogueVisuals } from '../DialogueVisualsContext'
import { useDialogueImage } from './useDialogueImage'

export function useDialogueSceneImage(messageId: number | undefined, reserveSpace: boolean) {
	const { scenes, recoverImage, refreshVisuals } = useDialogueVisuals()
	const scene = messageId === undefined ? undefined : scenes.get(messageId)
	const image = scene?.image
	const hasSlot = reserveSpace || Boolean(image || scene?.generationStatus)
	const [hadSlot, setHadSlot] = useState(hasSlot)
	const [isVisible, setIsVisible] = useState(false)
	const [attempt, setAttempt] = useState(0)
	const slotRef = useRef<HTMLDivElement>(null)
	const assetKey = `scene-${image?.id ?? messageId}`

	const onError = useCallback(
		function () {
			recoverImage(assetKey)
		},
		[recoverImage, assetKey],
	)
	const { loadedUrl, isError, handleDisplayError } = useDialogueImage(image?.url, isVisible, onError, attempt)
	const showSlot = hasSlot || hadSlot

	useEffect(
		function () {
			if (hasSlot) setHadSlot(true)
		},
		[hasSlot],
	)

	useEffect(
		function () {
			const element = slotRef.current
			if (!element || !showSlot) return
			if (typeof IntersectionObserver === 'undefined') {
				setIsVisible(true)
				return
			}

			const observer = new IntersectionObserver(
				function (entries) {
					if (!entries.some((entry) => entry.isIntersecting)) return
					setIsVisible(true)
					observer.disconnect()
				},
				{ rootMargin: '200px' },
			)
			observer.observe(element)

			return function () {
				observer.disconnect()
			}
		},
		[showSlot],
	)

	function retryDownload() {
		refreshVisuals()
		setAttempt((value) => value + 1)
	}

	return {
		slotRef,
		showSlot,
		loadedUrl,
		isError,
		handleDisplayError,
		retryDownload,
		failed: !loadedUrl && (isError || scene?.generationStatus === 'failed'),
	}
}
