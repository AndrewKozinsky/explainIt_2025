import { useCallback, useEffect, useState } from 'react'

/** Successful URLs are kept by the browser; only concurrent loads need sharing. */
const imageLoads = new Map<string, Promise<void>>()

export function loadDialogueImage(url: string): Promise<void> {
	const existing = imageLoads.get(url)
	if (existing) return existing

	const request = new Promise<void>(function (resolve, reject) {
		const image = new Image()
		const timeout = setTimeout(function () {
			image.src = ''
			reject(new Error('Image unavailable'))
		}, 30_000)
		image.onload = function () {
			clearTimeout(timeout)
			if (typeof image.decode === 'function') void image.decode().then(resolve, reject)
			else resolve()
		}
		image.onerror = function () {
			clearTimeout(timeout)
			reject(new Error('Image unavailable'))
		}
		image.src = url
	})
	imageLoads.set(url, request)

	void request.then(
		function () {
			imageLoads.delete(url)
		},
		function () {
			imageLoads.delete(url)
		},
	)

	return request
}

/** Keep the displayed URL while a refreshed signed URL is loading. */
export function useDialogueImage(url: string | undefined, enabled: boolean, onError: () => void, attempt = 0) {
	const [loadedUrl, setLoadedUrl] = useState<string>()
	const [failedUrl, setFailedUrl] = useState<string>()
	useEffect(
		function () {
			if (!url || !enabled) return
			let active = true
			void loadDialogueImage(url).then(
				function () {
					if (!active) return
					setLoadedUrl(url)
					setFailedUrl(undefined)
				},
				function () {
					if (!active) return
					setFailedUrl(url)
					onError()
				},
			)
			return function () {
				active = false
			}
		},
		[url, enabled, onError, attempt],
	)

	const handleDisplayError = useCallback(
		function () {
			setLoadedUrl(undefined)
			setFailedUrl(url)
			onError()
		},
		[url, onError],
	)

	return { loadedUrl, isError: Boolean(url && failedUrl === url && !loadedUrl), handleDisplayError }
}
