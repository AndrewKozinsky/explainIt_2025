'use client'

import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import type { DialogueServerMessage } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'
import AiDialogueExamMedal from './AiDialogueExamMedal'
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
	console.log(JSON.stringify(result))

	if (result)
		return (
			<section className='ai-dialogue-exam-submission' aria-label={t('result')}>
				<h2>{t('result')}</h2>
				<p className='ai-dialogue-exam-submission__level'>
					{result.level === 'A0' ? t('belowA1') : t('achievedLevel', { level: result.level })}
				</p>
				{result.level !== 'A0' && <AiDialogueExamMedal url={result.medalUrl} level={result.level} />}
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

const deleteLater = {
	level: 'A1',
	summary:
		'Участник может кратко ответить на простые прямые вопросы, используя элементарные фразы. Он понимает основные запросы (например, показать паспорт, цель визита, продолжительность пребывания) и отвечает коротко, но коммуникация остается на уровне базовых формул без развития мысли.',
	strengths: [
		"Понимает простые вопросы и команды (например, 'Passport, please') и реагирует соответствующим образом.",
		"Может сообщить основную информацию: цель визита ('Just tourism') и дать короткий ответ.",
		'Использует вежливое приветствие и готовность к взаимодействию.',
	],
	errors: [
		{
			messageId: 6,
			originalText: 'Just tourism',
			suggestedText: 'For tourism.',
			explanation: "Пропущено предлог 'for' перед существительным, обозначающим цель; типичная ошибка уровня A1.",
		},
		{
			messageId: 4,
			originalText: 'Hello! Here is my passport.',
			suggestedText: 'Hello! Here you are.',
			explanation:
				"Хотя фраза понятна, в данном контексте более естественно использовать устойчивое выражение 'Here you are' при передаче предмета; 'Here is my passport' звучит как объявление о наличии паспорта, а не как акт передачи.",
		},
	],
	recommendations: [
		"Практикуйте полные ответы на вопросы о цели визита и продолжительности пребывания, используя конструкции типа 'I am here for tourism' или 'I plan to stay for a week'.",
		'Расширяйте словарный запас по теме путешествий (например, названия достопримечательностей, виды туризма) и учитесь давать чуть более развернутые ответы.',
		"Обратите внимание на использование предлогов в выражениях цели ('for + noun') и устойчивых фраз при передаче предметов ('Here you are').",
		'Для повышения уровня старайтесь не только отвечать на вопросы, но и самостоятельно формулировать уточняющие реплики или небольшие пояснения.',
	],
	medalUrl: 'https://files.immersia.site/ai-dialogue-scenario-medals/localdev/passport-control/A1.webp',
}
