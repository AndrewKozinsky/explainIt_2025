import { useCallback } from 'react'
import { NotifyArg } from 'ui/Notification/context'
import { useWatchingStore } from '_pages/video/watching/watchingStore'

export function useGetOnCopyClick(notify: (arg: NotifyArg) => void) {
	const selectedText = useWatchingStore((s) => s.selectedText)
	const sentenceText = selectedText.subtitle?.sentenceText ?? selectedText.plainText?.sentenceText ?? ''

	const onCopy = useCallback(async () => {
		if (!sentenceText) return

		try {
			await copyToClipboard(sentenceText)
			notify({ type: 'success', message: 'Скопировано в буфер обмена.' })
		} catch (e) {
			notify({ type: 'error', message: 'Не удалось скопировать в буфер обмена.' })
		}
	}, [sentenceText, notify])

	return {
		sentenceText,
		onCopy,
	}
}

async function copyToClipboard(text: string) {
	if (navigator?.clipboard?.writeText) {
		await navigator.clipboard.writeText(text)
		return
	}

	const textarea = document.createElement('textarea')
	textarea.value = text
	textarea.style.position = 'fixed'
	textarea.style.left = '-9999px'
	textarea.style.top = '0'
	document.body.appendChild(textarea)
	textarea.focus()
	textarea.select()
	const ok = document.execCommand('copy')
	document.body.removeChild(textarea)
	if (!ok) throw new Error('Copy failed')
}
