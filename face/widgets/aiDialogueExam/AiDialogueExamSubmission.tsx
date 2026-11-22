'use client'

import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { getExamProgress } from './fn/examProgress'
import { useExamSubmission } from './fn/useExamSubmission'
import './AiDialogueExamSubmission.scss'

type Props = {
	dialogueId: number
	messages: DialogueServerMessage[]
	generating: boolean
	balanceExhausted: boolean
	onCheckingChange: (value: boolean) => void
}

export default function AiDialogueExamSubmission({
	dialogueId,
	messages,
	generating,
	balanceExhausted,
	onCheckingChange,
}: Props) {
	const t = useTranslations('aiDialoguePage.exam')
	const { remaining, result } = getExamProgress(messages)
	const { pending, error, submit } = useExamSubmission(dialogueId, onCheckingChange)

	if (result)
		return (
			<section className='ai-dialogue-exam-submission' aria-label={t('result')}>
				<h2>{t('result')}</h2>
				<p className='ai-dialogue-exam-submission__level'>
					{result.level === 'A0' ? t('belowA1') : t('achievedLevel', { level: result.level })}
				</p>
				<p>{result.summary}</p>
				{result.strengths.length > 0 && (
					<>
						<h3>{t('strengths')}</h3>
						<ul>
							{result.strengths.map((text, index) => (
								<li key={index}>{text}</li>
							))}
						</ul>
					</>
				)}
				{result.errors.length > 0 && (
					<>
						<h3>{t('errors')}</h3>
						<ul>
							{result.errors.map((error, index) => (
								<li key={index}>
									<p>
										{error.originalText} → {error.suggestedText}
									</p>
									<p>{error.explanation}</p>
								</li>
							))}
						</ul>
					</>
				)}
				<h3>{t('recommendations')}</h3>
				<ul>
					{result.recommendations.map((text, index) => (
						<li key={index}>{text}</li>
					))}
				</ul>
				<p className='ai-dialogue-exam-submission__note'>{t('attemptOnly')}</p>
			</section>
		)
	return (
		<div className='ai-dialogue-exam-submission'>
			<Button
				theme='accent'
				size='big'
				disabled={remaining > 0 || generating || pending || balanceExhausted}
				loading={pending}
				onClick={submit}
			>
				{pending ? t('checking') : remaining > 0 ? t('availableAfter', { count: remaining }) : t('check')}
			</Button>
			{error !== null && <p role='alert'>{error || t('failed')}</p>}
		</div>
	)
}
