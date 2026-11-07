import { useTranslations } from 'next-intl'
import type { UserMessagePartCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import { LockSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/LockSmallButtonIcon'
import { MicSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/MicSmallButtonIcon'
import { TextSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/TextSmallButtonIcon'
import { WarningSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/WarningSmallButtonIcon'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import { type DialogueDraftState, type DraftErrorKey, draftStatus } from './fn/aiDialogueDraftState'

export function AiDialogueDraftFeedback({ result, stale }: { result: UserMessagePartCheck | null; stale: boolean }) {
	const t = useTranslations('aiDialogueForm.feedback')

	if (!result || (!result.critical.length && !result.suggestions.length)) return null
	return (
		<div className='ai-dialogue-input__feedback'>
			{stale && <p className='ai-dialogue-input__stale'>{t('stale')}</p>}
			<ol className='ai-dialogue-input__critical' aria-label={t('critical')}>
				{result.critical.map((issue, index) => (
					<CriticalIssue key={index} issue={issue} />
				))}
			</ol>
			{result.suggestions.length > 0 && <Suggestions items={result.suggestions} label={t('suggestions')} />}
		</div>
	)
}

function CriticalIssue({ issue }: { issue: UserMessagePartCheck['critical'][number] }) {
	return (
		<li className='ai-dialogue-input__issue'>
			<div>
				<div className='ai-dialogue-input__error-header'>
					<StyledMarkdown content={issue.title} />
				</div>
				<div className='ai-dialogue-input__error-sentence'>
					<StyledMarkdown content={issue.sentenceMarkdown} />
				</div>
				<div className='ai-dialogue-input__error-analysis'>
					<StyledMarkdown content={issue.explanationMarkdown} />
				</div>
			</div>
		</li>
	)
}

function Suggestions({ items, label }: { items: UserMessagePartCheck['suggestions']; label: string }) {
	return (
		<div className='ai-dialogue-input__suggestions' aria-label={label}>
			{items.map((item, index) => (
				<div className='ai-dialogue-input__suggestion' key={index}>
					<div className='ai-dialogue-input__suggestion-top'>
						<StyledMarkdown content={item.explanationMarkdown} />
					</div>
					<p className='ai-dialogue-input__suggestion-bottom'>{item.example}</p>
				</div>
			))}
		</div>
	)
}

export function AiDialogueDraftStatus({ state }: { state: DialogueDraftState }) {
	const t = useTranslations('aiDialogueForm')
	const status = draftStatus(state)
	return (
		<div className='ai-dialogue-input__status' role='status' aria-live='polite'>
			{'empty' in status ? (
				<span>
					{t.rich(`emptyStatus.${state.activePart}`, {
						typeIcon: () => <TextSmallButtonIcon />,
						micIcon: () => <MicSmallButtonIcon />,
					})}
				</span>
			) : (
				<>
					{status.locked && <LockSmallButtonIcon />}
					{t(`status.${status.key}`, { count: status.errorCount ?? 0 })}
				</>
			)}
		</div>
	)
}

export function AiDialogueDraftRequestError({
	errorKey,
	dialogueId,
}: {
	errorKey: DraftErrorKey | null
	dialogueId: number
}) {
	const t = useTranslations('aiDialogueForm.errors')
	return (
		<div className='ai-dialogue-input__error-area' id={`ai-dialogue-draft-error-${dialogueId}`}>
			{errorKey && (
				<p className='ai-dialogue-input__request-error' role='alert'>
					<WarningSmallButtonIcon />
					{t(errorKey)}
				</p>
			)}
		</div>
	)
}
