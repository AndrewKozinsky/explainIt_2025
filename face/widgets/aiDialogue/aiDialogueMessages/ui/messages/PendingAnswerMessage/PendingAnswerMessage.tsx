import { useTranslations } from 'next-intl'
import './PendingAnswerMessage.scss'

/**
 * Плейсхолдер, показываемый, пока ответ ИИ ещё не готов (тип события неизвестен
 * или ещё не пришёл).
 */
function PendingAnswerMessage() {
	const t = useTranslations('aiDialogueMessages')

	return (
		<div className='pending-answer-message' role='status' aria-label={t('waitingForReply')}>
			<span className='pending-answer-message__text' aria-hidden='true'>
				<span className='pending-answer-message__label' data-text={t('waitingForReply')}>
					{t('waitingForReply')}
				</span>
				<span className='pending-answer-message__dots'>...</span>
			</span>
		</div>
	)
}

export default PendingAnswerMessage
