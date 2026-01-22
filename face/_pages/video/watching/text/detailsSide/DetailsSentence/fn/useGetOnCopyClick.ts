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
		try {
			await navigator.clipboard.writeText(text)
			return
		} catch (e) {
			// Some browsers expose navigator.clipboard but reject writeText on mobile due to permissions/user gesture.
		}
	}

	copyToClipboardByExecCommand(text)
}

function copyToClipboardByExecCommand(text: string) {
	if (!document?.body) throw new Error('No document body')

	const textarea = document.createElement('textarea')
	textarea.value = text
	textarea.setAttribute('readonly', '')
	textarea.style.position = 'fixed'
	textarea.style.left = '-9999px'
	textarea.style.top = '0'
	textarea.style.opacity = '0'

	document.body.appendChild(textarea)

	try {
		textarea.focus()
		textarea.select()
		textarea.setSelectionRange(0, textarea.value.length)
		const ok = document.execCommand('copy')
		if (!ok) throw new Error('Copy failed')
	} finally {
		document.body.removeChild(textarea)
	}
}
