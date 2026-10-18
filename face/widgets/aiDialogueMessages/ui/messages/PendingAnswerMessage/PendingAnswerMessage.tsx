import './PendingAnswerMessage.scss'

/**
 * Плейсхолдер, показываемый, пока ответ ИИ ещё не готов (тип события неизвестен
 * или ещё не пришёл).
 */
function PendingAnswerMessage() {
	return (
		<div className='pending-answer-message'>
			<span className='pending-answer-message__text' data-text='Ожидание ответа…'>
				Ожидание ответа…
			</span>
		</div>
	)
}

export default PendingAnswerMessage
