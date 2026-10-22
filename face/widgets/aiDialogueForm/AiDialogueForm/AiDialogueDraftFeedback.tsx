import type { UserMessagePartCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import { LockSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/LockSmallButtonIcon'
import { MicSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/MicSmallButtonIcon'
import { TextSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/TextSmallButtonIcon'
import { WarningSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/WarningSmallButtonIcon'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import { type DialogueDraftState, draftStatus } from './fn/aiDialogueDraftState'

export function AiDialogueDraftFeedback({ result, stale }: { result: UserMessagePartCheck | null; stale: boolean }) {
	if (!result || (!result.critical.length && !result.suggestions.length)) return null
	return (
		<div className='ai-dialogue-input__feedback'>
			{stale && <p className='ai-dialogue-input__stale'>Замечания к предыдущей версии текста</p>}
			<ol className='ai-dialogue-input__critical' aria-label='Критические ошибки'>
				{result.critical.map((issue, index) => (
					<CriticalIssue key={index} issue={issue} />
				))}
			</ol>
			{result.suggestions.length > 0 && <Suggestions items={result.suggestions} />}
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

function Suggestions({ items }: { items: UserMessagePartCheck['suggestions'] }) {
	return (
		<div className='ai-dialogue-input__suggestions' aria-label='Рекомендации'>
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
	const status = draftStatus(state)
	return (
		<div className='ai-dialogue-input__status' role='status' aria-live='polite'>
			{status.empty ? (
				<EmptyStatus action={state.activePart === 'action'} />
			) : (
				<>
					{status.locked && <LockSmallButtonIcon />}
					{status.text}
				</>
			)}
		</div>
	)
}

function EmptyStatus({ action }: { action: boolean }) {
	return (
		<span>
			Напечатайте <TextSmallButtonIcon /> или продиктуйте <MicSmallButtonIcon /> {action ? 'действие' : 'реплику'}
		</span>
	)
}

export function AiDialogueDraftRequestError({ text, dialogueId }: { text: string | null; dialogueId: number }) {
	return (
		<div className='ai-dialogue-input__error-area' id={`ai-dialogue-draft-error-${dialogueId}`}>
			{text && (
				<p className='ai-dialogue-input__request-error' role='alert'>
					<WarningSmallButtonIcon />
					{text}
				</p>
			)}
		</div>
	)
}
