import { useTranslations } from 'next-intl'
import type { AiDialogueListExamOutModel } from '@/shared/api/generated/models'
import AiDialogueEarnedMedal from './AiDialogueEarnedMedal'
import { AiDialogueExamFailedShield, AiDialogueExamInProgressShield } from './AiDialogueExamShields'
import './AiDialogueExamSummary.scss'

export default function AiDialogueExamSummary({ exam }: { exam: AiDialogueListExamOutModel }) {
	const t = useTranslations('userAiDialogues.card.exam')

	const { status, level, medalUrl } = exam

	return (
		<div className='ai-dialogue-exam-summary'>
			{status === 'inProgress' && <AiDialogueExamInProgressShield />}
			{status === 'passed' && <AiDialogueEarnedMedal url={medalUrl} />}
			{status === 'failed' && <AiDialogueExamFailedShield />}
			<div className='ai-dialogue-exam-summary__copy'>
				<p className='ai-dialogue-exam-summary__status'>{t(`${status}.title`)}</p>
				<p>{t(`${status}.description`, { level: level ?? '' })}</p>
			</div>
		</div>
	)
}
