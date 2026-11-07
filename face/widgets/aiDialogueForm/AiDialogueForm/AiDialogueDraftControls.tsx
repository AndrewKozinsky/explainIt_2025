import type { PointerEventHandler } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { LoadingSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/LoadingSmallButtonIcon'
import { MicSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/MicSmallButtonIcon'
import { ExitButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ExitButtonIcon'
import StopRecordingButtonIcon from '@/shared/ui/icons/buttonIcons/standard/StopRecordingButtonIcon'
import Switcher from '@/shared/ui/Switcher/Switcher'
import { AiDialogueDraftStatus } from './AiDialogueDraftFeedback'
import { canSendDraft, type DialogueDraftState, isPartReady } from './fn/aiDialogueDraftState'
import type { AiDialogueDraftController } from './fn/AiDialogueDraftController'

type Props = { state: DialogueDraftState; controller: AiDialogueDraftController; blocked: boolean }

export function AiDialogueDraftHeader({ state, controller, blocked }: Props) {
	const t = useTranslations('aiDialogueForm')
	const busy = blocked || state.sending

	const items = [
		{
			text: t('parts.speech'),
			isCurrent: state.activePart === 'speech',
			onClick: () => controller.selectPart('speech'),
		},
		{
			text: t('parts.action'),
			isCurrent: state.activePart === 'action',
			onClick: () => controller.selectPart('action'),
		},
	]

	return (
		<div className='ai-dialogue-input__header'>
			<Switcher type='fit' orientation='horizontal' disabled={busy || !!state.dictation} items={items} />
			<Button theme='outline' icon={<ExitButtonIcon />} disabled={busy} onClick={() => void controller.leave()}>
				{t('buttons.leave')}
			</Button>
		</div>
	)
}

export function AiDialogueDraftFooter({
	state,
	controller,
	blocked,
	preserveFocus,
}: Props & { preserveFocus: PointerEventHandler<HTMLButtonElement> }) {
	const t = useTranslations('aiDialogueForm.buttons')
	const current = state.parts[state.activePart]
	const busy = blocked || state.sending
	const finishing = state.dictation?.phase === 'finishing'
	const showSend = isPartReady(current)

	const icon = finishing ? (
		<LoadingSmallButtonIcon />
	) : state.dictation ? (
		<StopRecordingButtonIcon />
	) : (
		<MicSmallButtonIcon />
	)

	const buttonDisabled = showSend
		? !canSendDraft(state) || blocked
		: busy || !!state.dictation || !current.text.trim()

	return (
		<div className='ai-dialogue-input__footer'>
			<AiDialogueDraftStatus state={state} />
			<div className='ai-dialogue-input__actions'>
				<Button
					theme={state.dictation && !finishing ? 'accent' : 'regular'}
					icon={icon}
					disabled={busy || current.checking || finishing}
					onPointerDown={preserveFocus}
					onClick={() => (state.dictation ? controller.stopDictation() : controller.startDictation())}
				>
					{t(finishing ? 'recognizing' : state.dictation ? 'stopDictation' : 'dictate')}
				</Button>
				<Button
					theme={showSend ? 'accent' : 'regular'}
					extraClass={showSend ? undefined : 'ai-dialogue-input__check-button'}
					loading={current.checking || state.sending}
					disabled={buttonDisabled}
					onClick={() => (showSend ? void controller.send() : void controller.checkActivePart())}
				>
					{t(showSend ? 'send' : 'check')}
				</Button>
			</div>
		</div>
	)
}
