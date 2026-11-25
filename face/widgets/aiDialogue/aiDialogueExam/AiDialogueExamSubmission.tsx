'use client'

import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import './AiDialogueExamSubmission.scss'

type Props = {
	remaining: number
	generating: boolean
	balanceExhausted: boolean
	pending: boolean
	error: string | null
	onSubmit: () => void
}

export default function AiDialogueExamSubmission({
	remaining,
	generating,
	balanceExhausted,
	pending,
	error,
	onSubmit,
}: Props) {
	const t = useTranslations('aiDialoguePage.exam')

	return (
		<div className='ai-dialogue-exam-submission'>
			<Button
				theme='accent'
				size='big'
				disabled={remaining > 0 || generating || pending || balanceExhausted}
				loading={pending}
				onClick={onSubmit}
			>
				{pending ? t('checking') : remaining > 0 ? t('availableAfter', { count: remaining }) : t('check')}
			</Button>
			{error !== null && <p role='alert'>{error || t('failed')}</p>}
		</div>
	)
}
