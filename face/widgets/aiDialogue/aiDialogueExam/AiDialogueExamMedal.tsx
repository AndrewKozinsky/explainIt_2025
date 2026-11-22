import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { AiDialogueCefrLevel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import './AiDialogueExamMedal.scss'

type Props = { url: string | null; level: AiDialogueCefrLevel }

export default function AiDialogueExamMedal({ url, level }: Props) {
	const t = useTranslations('aiDialoguePage.exam')
	const [failedUrl, setFailedUrl] = useState<string | null>(null)

	if (!url || url === failedUrl) {
		return null
	}

	return (
		<img
			className='ai-dialogue-exam-medal'
			src={url}
			alt={t('medal', { level })}
			width={256}
			height={256}
			onError={() => setFailedUrl(url)}
		/>
	)
}
