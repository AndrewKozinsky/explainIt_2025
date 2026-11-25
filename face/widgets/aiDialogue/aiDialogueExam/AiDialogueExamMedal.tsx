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
		<div className='ai-dialogue-exam-medal'>
			<img className='ai-dialogue-exam-medal__image ai-dialogue-exam-medal__glow' src={url} alt='' />
			<span className='ai-dialogue-exam-medal__rings' aria-hidden='true' />
			<img className='ai-dialogue-exam-medal__image ai-dialogue-exam-medal__shadow--soft' src={url} alt='' />
			<img className='ai-dialogue-exam-medal__image ai-dialogue-exam-medal__shadow--medium' src={url} alt='' />
			<img className='ai-dialogue-exam-medal__image ai-dialogue-exam-medal__shadow--sharp' src={url} alt='' />
			<img
				className='ai-dialogue-exam-medal__image'
				src={url}
				alt={t('medal', { level })}
				onError={() => setFailedUrl(url)}
			/>
			<span className='ai-dialogue-exam-medal__sparkle ai-dialogue-exam-medal__sparkle--top' aria-hidden='true'>
				✦
			</span>
			<span className='ai-dialogue-exam-medal__sparkle ai-dialogue-exam-medal__sparkle--left' aria-hidden='true'>
				✦
			</span>
			<span className='ai-dialogue-exam-medal__sparkle ai-dialogue-exam-medal__sparkle--right' aria-hidden='true'>
				✦
			</span>
		</div>
	)
}
