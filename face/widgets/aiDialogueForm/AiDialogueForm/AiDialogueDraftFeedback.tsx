import { useTranslations } from 'next-intl'
import { WarningSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/WarningSmallButtonIcon'
import type { DraftErrorKey, DraftSubmitError } from './fn/aiDialogueDraftState'

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
