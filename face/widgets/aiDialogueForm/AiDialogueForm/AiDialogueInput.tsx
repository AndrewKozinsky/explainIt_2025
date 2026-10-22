'use client'

import type { ChangeEvent, KeyboardEvent, PointerEvent } from 'react'
import { AiDialogueDraftFooter, AiDialogueDraftHeader } from './AiDialogueDraftControls'
import { AiDialogueDraftFeedback, AiDialogueDraftRequestError } from './AiDialogueDraftFeedback'
import { isPartChecked, isPartReady, MAX_DRAFT_LENGTH } from './fn/aiDialogueDraftState'
import { useAiDialogueDraft } from './fn/useAiDialogueDraft'
import { useDraftTextarea } from './fn/useDraftTextarea'
import './AiDialogueInput.scss'

/** Новый dialogueId создаёт отдельный черновик и отменяет операции прежнего диалога. */
export default function AiDialogueInput({ dialogueId }: { dialogueId: number }) {
	return <AiDialogueReplyForm key={dialogueId} dialogueId={dialogueId} />
}

function AiDialogueReplyForm({ dialogueId }: { dialogueId: number }) {
	const { state, controller, blocked } = useAiDialogueDraft(dialogueId)
	const { activePart, parts, dictation } = state
	const current = parts[activePart]
	const inputRef = useDraftTextarea(current, !!dictation)
	const busy = blocked || state.sending
	const readOnly = busy || current.checking || !!dictation
	const showSend = isPartReady(current)
	const finishing = dictation?.phase === 'finishing'

	function rememberSelection() {
		const input = inputRef.current
		if (input) controller.rememberSelection(activePart, { start: input.selectionStart, end: input.selectionEnd })
	}

	function preserveFocus(event: PointerEvent<HTMLButtonElement>) {
		event.preventDefault()
		rememberSelection()
		inputRef.current?.focus({ preventScroll: true })
	}

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return
		event.preventDefault()

		if (showSend) void controller.send()
		else void controller.checkActivePart()
	}

	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		controller.edit(activePart, event.target.value, {
			start: event.target.selectionStart,
			end: event.target.selectionEnd,
		})
	}

	return (
		<section className='ai-dialogue-input' aria-label='Ответ в диалоге'>
			<AiDialogueDraftHeader state={state} controller={controller} blocked={blocked} />
			<textarea
				ref={inputRef}
				className={`ai-dialogue-input__editor${current.checking || finishing || busy ? ' ai-dialogue-input__editor--pending' : ''}`}
				aria-label={activePart === 'speech' ? 'Текст реплики' : 'Текст действия'}
				aria-describedby={`ai-dialogue-draft-error-${dialogueId}`}
				aria-busy={current.checking || !!dictation}
				placeholder={activePart === 'speech' ? 'Hi, how’s it going?' : 'I opened the door'}
				value={current.text}
				rows={1}
				maxLength={MAX_DRAFT_LENGTH}
				readOnly={readOnly}
				spellCheck={false}
				onChange={handleChange}
				onSelect={rememberSelection}
				onBlur={rememberSelection}
				onKeyDown={handleKeyDown}
			/>
			<AiDialogueDraftRequestError text={current.error} dialogueId={dialogueId} />
			<AiDialogueDraftFeedback
				result={current.text.trim() ? (current.review?.result ?? null) : null}
				stale={!isPartChecked(current)}
			/>
			<AiDialogueDraftFooter
				state={state}
				controller={controller}
				blocked={blocked}
				preserveFocus={preserveFocus}
			/>
		</section>
	)
}
