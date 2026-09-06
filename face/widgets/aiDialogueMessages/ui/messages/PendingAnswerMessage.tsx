import './AiDialogueMessages.scss'

/**
 * Плейсхолдер, показываемый, пока ответ ИИ ещё не готов (тип события неизвестен
 * или ещё не пришёл).
 */
function PendingAnswerMessage() {
	return <div className='ai-dialogue-message ai-dialogue-message--pending'>Ответ от ИИ готовится…</div>
}

export default PendingAnswerMessage
