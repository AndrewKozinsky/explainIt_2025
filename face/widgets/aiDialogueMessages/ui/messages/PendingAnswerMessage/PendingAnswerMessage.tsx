import './PendingAnswerMessage.scss'

/**
 * Плейсхолдер, показываемый, пока ответ ИИ ещё не готов (тип события неизвестен
 * или ещё не пришёл).
 */
function PendingAnswerMessage() {
	return <div className='pending-answer-message'>Ответ от ИИ готовится…</div>
}

export default PendingAnswerMessage
