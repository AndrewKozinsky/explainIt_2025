// import { filesUrls } from 'utils/filesUrls'
// import { useIsSendButtonDisabled } from './fn/isSendButtonDisabled'

/*type SendAndCancelButtonProps = {
	isGenerating: boolean
	prompt: string
	onSend: () => void
	onCancel: () => void
}*/

/*function SendAndCancelButton(props: SendAndCancelButtonProps) {
	const { isGenerating, onSend, onCancel, prompt } = props

	const iconUrl = isGenerating ? filesUrls.icons.stopGenerationIcon : filesUrls.icons.sendMessageIcon
	const buttonAction = isGenerating ? onCancel : onSend

	const isDisabled = useIsSendButtonDisabled(isGenerating, prompt)

	return (
		<button className='chat-input__send-button' disabled={isDisabled} onClick={buttonAction}>
			<img src={iconUrl} alt='send' />
		</button>
	)
}*/

// export default SendAndCancelButton
