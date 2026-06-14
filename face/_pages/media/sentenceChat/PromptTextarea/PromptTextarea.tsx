import { forwardRef, KeyboardEvent, useImperativeHandle, useRef } from 'react'
import { useUserStore } from '@/stores/userStore'
import { handleEnterToSend } from '../ChatInput/fn/handleEnterToSend'
import { computeInsertAtCaret, applyCaret } from '../ChatInput/fn/insertAtCaret'
import { useSentenceChatStore } from '../sentenceChatStore'
import { useAutoResizeTextarea } from './fn/useAutoResizeTextarea'
import './PromptTextarea.scss'

export type PromptTextareaHandle = {
	insertAtCaret: (text: string) => void
	submit: () => void
}

type PromptTextareaProps = {
	onSend: (question: string) => void
}

const PromptTextarea = forwardRef<PromptTextareaHandle, PromptTextareaProps>(function PromptTextarea(props, ref) {
	const { onSend } = props

	const prompt = useSentenceChatStore((s) => s.prompt)
	const setPrompt = useSentenceChatStore((s) => s.setPrompt)
	const setIsTextAreaFocused = useSentenceChatStore((s) => s.setIsTextAreaFocused)

	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
	const onSendRef = useRef(onSend)
	onSendRef.current = onSend

	useAutoResizeTextarea(textAreaRef, prompt)

	function getCanSend(): boolean {
		const current = useSentenceChatStore.getState().prompt.trim()
		return current.length > 0 && hasBalance && !useSentenceChatStore.getState().isGenerating
	}

	function handleSend() {
		if (!getCanSend()) return

		const trimmed = useSentenceChatStore.getState().prompt.trim()
		onSendRef.current(trimmed)
		setPrompt('')
	}

	useImperativeHandle(ref, () => ({
		insertAtCaret(text: string) {
			const el = textAreaRef.current
			const prev = useSentenceChatStore.getState().prompt
			const { next, caret } = computeInsertAtCaret(prev, el, text)
			setPrompt(next)
			requestAnimationFrame(() => applyCaret(el, caret))
		},
		submit() {
			handleSend()
		},
	}))

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		handleEnterToSend(event, handleSend)
	}

	return (
		<textarea
			ref={textAreaRef}
			className='prompt-textarea'
			value={prompt}
			onChange={(e) => setPrompt(e.target.value)}
			onKeyDown={handleKeyDown}
			onFocus={() => setIsTextAreaFocused(true)}
			onBlur={() => setIsTextAreaFocused(false)}
			placeholder='Любой вопрос про предложение: грамматика, смысл, похожие конструкции…'
			rows={2}
			disabled={!hasBalance}
		/>
	)
})

export default PromptTextarea
