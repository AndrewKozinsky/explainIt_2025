'use client'

import { KeyboardEvent, useState } from 'react'
import type { AiDialogueActionItem } from '@/entities/aiDialogue/types/aiDialogueMessage'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { useAiDialogueStore } from '../aiDialogueStore'
import { useAiDialogueSendMessage } from '../fn/useAiDialogueSendMessage'
import './AiDialogueInput.scss'

type AiDialogueInputProps = {
	dialogueId: number
}

/**
 * Форма ответа пользователя: действие и реплика + кнопка завершения диалога с NPC.
 *
 * Действие (что пользователь делает) и реплика (что говорит) собираются в событие
 * userActions с двумя action-элементами (type: 'action' и 'speech'). Достаточно
 * заполнить хотя бы одно поле. Завершение диалога — событие userAvoidsNPC.
 *
 * Пока NPC генерирует ответ (isGenerating) или сообщение отправляется — форма заблокирована.
 */
function AiDialogueInput({ dialogueId }: AiDialogueInputProps) {
	const isGenerating = useAiDialogueStore((state) => state.isGenerating)
	const { status, sendUserActions, finishDialogue } = useAiDialogueSendMessage(dialogueId)

	const [action, setAction] = useState('')
	const [speech, setSpeech] = useState('')

	const isDisabled = isGenerating || status === 'loading'

	async function handleSend() {
		const actionText = action.trim()
		const speechText = speech.trim()
		if ((!actionText && !speechText) || isDisabled) return

		const actions: AiDialogueActionItem[] = []
		if (actionText) actions.push({ type: 'action', content: actionText })
		if (speechText) actions.push({ type: 'speech', content: speechText })

		const ok = await sendUserActions(actions)
		if (ok) {
			setAction('')
			setSpeech('')
		}
	}

	async function handleFinish() {
		if (isDisabled) return

		await finishDialogue()
	}

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		// Enter отправляет; Shift+Enter — перенос строки.
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSend()
		}
	}

	return (
		<div className='ai-dialogue-input'>
			<div className='ai-dialogue-input__field'>
				<label className='ai-dialogue-input__label' htmlFor='ai-dialogue-action'>
					Действие
				</label>
				<textarea
					id='ai-dialogue-action'
					className='ai-dialogue-input__textarea'
					value={action}
					onChange={(e) => setAction(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Что вы делаете…'
					rows={1}
					disabled={isDisabled}
				/>
			</div>

			<div className='ai-dialogue-input__field'>
				<label className='ai-dialogue-input__label' htmlFor='ai-dialogue-speech'>
					Реплика
				</label>
				<textarea
					id='ai-dialogue-speech'
					className='ai-dialogue-input__textarea'
					value={speech}
					onChange={(e) => setSpeech(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Что вы говорите…'
					rows={2}
					disabled={isDisabled}
				/>
			</div>

			<div className='ai-dialogue-input__actions'>
				<Button theme='outline' onClick={handleFinish} disabled={isDisabled}>
					Завершить диалог
				</Button>
				<Button theme='accent' onClick={handleSend} disabled={isDisabled} loading={status === 'loading'}>
					Отправить
				</Button>
			</div>
		</div>
	)
}

export default AiDialogueInput
