'use client'

import type { ChangeEvent, KeyboardEvent, PointerEvent } from 'react'
import { useTranslations } from 'next-intl'
import BalanceExhaustedNotice from '@/entities/user/ui/BalanceExhaustedNotice/BalanceExhaustedNotice'
import Divider from '@/shared/ui/Divider/Divider'
import type { SendAiDialogueMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { AiDialogueDraftFooter, AiDialogueDraftHeader } from './AiDialogueDraftControls'
import { AiDialogueDraftRequestError } from './AiDialogueDraftFeedback'
import { canSendDraft, MAX_DRAFT_LENGTH } from './fn/aiDialogueDraftState'
import { useAiDialogueDraft } from './fn/useAiDialogueDraft'
import { useDraftTextarea } from './fn/useDraftTextarea'
import './AiDialogueInput.scss'

type Props = { dialogueId: number; send: SendAiDialogueMessage; balanceExhausted: boolean }

/** Новый dialogueId создаёт отдельный черновик и отменяет операции прежнего диалога. */
export default function AiDialogueInput(props: Props) {
	return <AiDialogueReplyForm key={props.dialogueId} {...props} />
}

function AiDialogueReplyForm({ dialogueId, send, balanceExhausted }: Props) {
	const t = useTranslations('aiDialogueForm')
	const { state, controller, blocked } = useAiDialogueDraft(dialogueId, send, balanceExhausted)
	const { activePart, parts, dictation } = state
	const current = parts[activePart]
	const editorVisible = !balanceExhausted || state.sending
	const inputRef = useDraftTextarea(current, !!dictation, editorVisible)
	const busy = blocked || state.sending
	const readOnly = busy || !!dictation
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

		if (!blocked && canSendDraft(state)) void controller.send()
	}

	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		controller.edit(activePart, event.target.value, {
			start: event.target.selectionStart,
			end: event.target.selectionEnd,
		})
	}

	if (!editorVisible) return <BalanceExhaustedNotice placement='dialogue_page' />

	return (
		<section className='ai-dialogue-input' aria-label={t('formLabel')}>
			<AiDialogueDraftHeader state={state} controller={controller} blocked={blocked} />
			<textarea
				ref={inputRef}
				className={`ai-dialogue-input__editor${finishing || busy ? ' ai-dialogue-input__editor--pending' : ''}`}
				aria-label={t(`inputLabel.${activePart}`)}
				aria-describedby={`ai-dialogue-draft-error-${dialogueId}`}
				aria-busy={state.sending || !!dictation}
				placeholder={activePart === 'speech' ? 'Hi, how’s it going?' : 'I opened the door'}
				value={current.text}
				rows={1}
				maxLength={MAX_DRAFT_LENGTH}
				readOnly={readOnly}
				spellCheck={false}
				// Текст ответа виден в записях сессий PostHog (posthogConfig.unmaskedInputAttribute).
				data-posthog-unmask
				onChange={handleChange}
				onSelect={rememberSelection}
				onBlur={rememberSelection}
				onKeyDown={handleKeyDown}
			/>
			<AiDialogueDraftRequestError
				errorKey={current.error}
				submitError={state.submitError}
				dialogueId={dialogueId}
			/>
			<Divider />
			<AiDialogueDraftFooter
				state={state}
				controller={controller}
				blocked={blocked}
				preserveFocus={preserveFocus}
			/>
		</section>
	)
}
