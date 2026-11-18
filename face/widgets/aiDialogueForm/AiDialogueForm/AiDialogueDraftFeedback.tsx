import { useTranslations } from 'next-intl'
import { MicSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/MicSmallButtonIcon'
import { TextSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/TextSmallButtonIcon'
import { WarningSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/WarningSmallButtonIcon'
import {
	type DialogueDraftState,
	type DraftErrorKey,
	type DraftSubmitError,
	draftStatus,
} from './fn/aiDialogueDraftState'

export function AiDialogueDraftStatus({ state }: { state: DialogueDraftState }) {
	const t = useTranslations('aiDialogueForm')
	const status = draftStatus(state)

	return (
		<div className='ai-dialogue-input__status' role='status' aria-live='polite'>
			{status === 'empty'
				? t.rich(`emptyStatus.${state.activePart}`, {
						typeIcon: () => <TextSmallButtonIcon />,
						micIcon: () => <MicSmallButtonIcon />,
					})
				: status && t(`status.${status}`)}
		</div>
	)
}

export function AiDialogueDraftRequestError({
	errorKey,
	submitError,
	dialogueId,
}: {
	errorKey: DraftErrorKey | null
	submitError: DraftSubmitError | null
	dialogueId: number
}) {
	const t = useTranslations('aiDialogueForm.errors')
	const error = submitError ? submitError.message || t('sendFailed') : errorKey && t(errorKey)

	return (
		<div className='ai-dialogue-input__error-area' id={`ai-dialogue-draft-error-${dialogueId}`}>
			{error && (
				<p className='ai-dialogue-input__request-error' role='alert'>
					<WarningSmallButtonIcon />
					{error}
				</p>
			)}
		</div>
	)
}
