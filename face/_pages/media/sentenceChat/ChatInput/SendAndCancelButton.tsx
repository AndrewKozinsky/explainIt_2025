import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { useIsSendButtonDisabled } from './fn/isSendButtonDisabled'

type SendAndCancelButtonProps = {
	isGenerating: boolean
	onSend: () => void
	onCancel: () => void
}

function SendAndCancelButton(props: SendAndCancelButtonProps) {
	const { isGenerating, onSend, onCancel } = props

	const iconUrl = isGenerating ? publicFolderFilesUrls.icons.stopGeneration : publicFolderFilesUrls.icons.sendMessage
	const buttonAction = isGenerating ? onCancel : onSend

	const isDisabled = useIsSendButtonDisabled(isGenerating)

	return (
		<button className='chat-input__send-button' disabled={isDisabled} onClick={buttonAction}>
			<img src={iconUrl} alt='send' />
		</button>
	)
}

export default SendAndCancelButton
