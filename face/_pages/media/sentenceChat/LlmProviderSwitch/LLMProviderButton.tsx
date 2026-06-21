import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import DeepseekButtonIcon from 'ui/icons/buttonIcons/DeepseekButtonIcon'
import DeepseekLiteButtonIcon from 'ui/icons/buttonIcons/DeepseekLiteButtonIcon'
import GeminiButtonIcon from 'ui/icons/buttonIcons/GeminiButtonIcon'
import GeminiLiteButtonIcon from 'ui/icons/buttonIcons/GeminiLiteButtonIcon'
import OpenAIButtonIcon from 'ui/icons/buttonIcons/OpenAIButtonIcon'
import OpenAILiteButtonIcon from 'ui/icons/buttonIcons/OpenAILiteButtonIcon'
import { LlmProvider, useSentenceChatStore } from '../sentenceChatStore'

type LLMProviderButtonProps = {
	activeProvider: LlmProvider
	provider: LlmProvider
	smallIcon: boolean
}

function LLMProviderButton(props: LLMProviderButtonProps) {
	const { activeProvider, provider, smallIcon } = props

	const setLlmProvider = useSentenceChatStore((s) => s.setLlmProvider)
	const isActive = activeProvider === provider

	return (
		<BaseButton
			type='button'
			extraClass={cn('chat-input--llm-switch__button', isActive && 'chat-input--llm-switch__button--current')}
			onClick={() => setLlmProvider(provider)}
			disabled={isActive}
			theme='plain'
		>
			<LLMProviderButtonIcon provider={provider} smallIcon={smallIcon} />
		</BaseButton>
	)
}

export default LLMProviderButton

function LLMProviderButtonIcon({ provider, smallIcon }: { provider: LlmProvider; smallIcon: boolean }) {
	if (provider === 'gemini') {
		return smallIcon ? <GeminiLiteButtonIcon /> : <GeminiButtonIcon />
	} else if (provider === 'chatgpt') {
		return smallIcon ? <OpenAILiteButtonIcon /> : <OpenAIButtonIcon />
	} else {
		return smallIcon ? <DeepseekLiteButtonIcon /> : <DeepseekButtonIcon />
	}
}
