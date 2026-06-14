import ArrowUpPureButtonIcon from 'ui/icons/buttonIcons/ArrowUpPureButtonIcon'
import SquareButtonIcon from 'ui/icons/buttonIcons/SquareButtonIcon'
import ChatRoundButton from '_pages/media/sentenceChat/ChatRoundButton/ChatRoundButton'
import { useSentenceChatStore } from '../sentenceChatStore'
import { useIsSendButtonDisabled } from './fn/isSendButtonDisabled'
import './SendAndCancelButtons.scss'

type SendAndCancelButtonProps = {
	isGenerating: boolean
	onSend: () => void
	onCancel: () => void
}

function SendAndCancelButtons(props: SendAndCancelButtonProps) {
	const { isGenerating, onSend, onCancel } = props

	const prompt = useSentenceChatStore((s) => s.prompt)

	const iconUrl = isGenerating ? <SquareButtonIcon /> : <ArrowUpPureButtonIcon />
	const buttonAction = isGenerating ? onCancel : onSend

	const isDisabled = useIsSendButtonDisabled(isGenerating, prompt)

	return (
		<ChatRoundButton
			icon={iconUrl}
			disabled={isDisabled}
			onClick={buttonAction}
			color={isGenerating ? 'red' : 'blue'}
		/>
	)
	/*return (
		<button className='chat-input__send-buttons' disabled={isDisabled} onClick={buttonAction}>
			<img src={iconUrl} alt='send' />
		</button>
	)*/
}

export default SendAndCancelButtons
