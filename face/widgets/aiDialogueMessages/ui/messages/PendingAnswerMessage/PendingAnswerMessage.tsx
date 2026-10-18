import './PendingAnswerMessage.scss'

/**
 * Плейсхолдер, показываемый, пока ответ ИИ ещё не готов (тип события неизвестен
 * или ещё не пришёл).
 */
function PendingAnswerMessage() {
	return (
		<div className='pending-answer-message' role='status' aria-label='Ожидание ответа'>
			<span className='pending-answer-message__text' aria-hidden='true'>
				<span className='pending-answer-message__label' data-text='Ожидание ответа'>
					Ожидание ответа
				</span>
				<span className='pending-answer-message__dots'>...</span>
			</span>
		</div>
	)
}

export default PendingAnswerMessage
